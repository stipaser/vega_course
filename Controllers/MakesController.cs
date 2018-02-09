using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using vega.Controllers.Resources;
using vega.Core;
using vega.Models;
using vega.Persistence;

namespace vega.Controllers
{
    [Route("/api/vehicles/makes")]
    public class MakesController : Controller
    {
        private readonly IMapper _mapper;
        private readonly IMakeRepository _makeRepository;
        private readonly IUnitOfWork _unitOfWork;

        public MakesController(IMapper mapper, IMakeRepository makeRepository, IUnitOfWork unitOfWork)
        {
            _mapper = mapper;
            _makeRepository = makeRepository;
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<IEnumerable<MakeResource>> GetMakes()
        {
            var makes = await _makeRepository.GetMakes();
            return _mapper.Map<IEnumerable<Make>, IEnumerable<MakeResource>>(makes);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetMake(int id)
        {
            var make = await _makeRepository.GetMakeById(id);

            if (make == null)
                return NotFound();

            return Ok(_mapper.Map<Make, MakeResource>(make));
        }

        [HttpPost]
        public async Task<IActionResult> CreateMake([FromBody] MakeResource makeResource)
        {
            var make = _mapper.Map<MakeResource, Make>(makeResource);
            _makeRepository.Add(make);
            await _unitOfWork.CompleteAsync();
            
            return Ok(_mapper.Map<Make, MakeResource>(make));
        }

    }
}