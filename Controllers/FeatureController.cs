using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using vega.Controllers.Resources;
using vega.Core;
using vega.Models;
using vega.Persistence;

namespace vega.Controllers
{
    [Route("/api/vehicles/features")]
    [Authorize]
    public class FeatureController : Controller
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IFeatureRepository _featureRepository;

        public FeatureController(IUnitOfWork unitOfWork, IMapper mapper, IFeatureRepository featureRepository)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _featureRepository = featureRepository;
        }
        
        
        public async Task<IEnumerable<FeatureResource>> GetFeatures()
        {

            var claims = User.Claims;
            var features = await _featureRepository.GetFeatures();
                
            return _mapper.Map<IEnumerable<Feature>, IEnumerable<FeatureResource>>(features);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetFeature(int id)
        {
            var feature = await _featureRepository.GetFeatureById(id);
            if (feature == null)
                return NotFound();

            return Ok(_mapper.Map<Feature, FeatureResource>(feature));
        }

        [HttpPost]
        public async Task<IActionResult> CreateFeature([FromBody] FeatureResource featureResource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var feature = _mapper.Map<FeatureResource, Feature>(featureResource);

            _featureRepository.Add(feature);
            await _unitOfWork.CompleteAsync();

            var result = _mapper.Map<Feature, FeatureResource>(await _featureRepository.GetFeatureById(feature.Id));

            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateFeature(int id, [FromBody] FeatureResource featureResource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var feature = await _featureRepository.GetFeatureById(id);

            _mapper.Map<FeatureResource, Feature>(featureResource, feature);
            await _unitOfWork.CompleteAsync();
            

            var result = _mapper.Map<Feature, FeatureResource>(await _featureRepository.GetFeatureById(feature.Id));

            return Ok(result);
        }

    }
}