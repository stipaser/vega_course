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
    [Route("/api/vehicles/models")]
    public class ModelsController : Controller
    {
        private readonly IMapper _mapper;
        private readonly IModelRepository _modelRepository;
        private readonly IUnitOfWork _unitOfWork;

        public ModelsController(IMapper mapper, IModelRepository modelRepository, IUnitOfWork unitOfWork)
        {
            _mapper = mapper;
            _modelRepository = modelRepository;
            _unitOfWork = unitOfWork;
        }
        
        [HttpGet("{id}")]
        public async Task<IActionResult> GetModel(int id)
        {
            var model = await _modelRepository.GetModelById(id);

            if (model == null)
                return NotFound();

            return Ok(_mapper.Map<Model, ModelResource>(model));
        }

        [HttpPost]
        public async Task<IActionResult> CreateModel([FromBody] ModelResource modelResource)
        {
            var model = _mapper.Map<ModelResource, Model>(modelResource);

            if (model == null)
                return BadRequest();

            _modelRepository.CreateModel(model);
            await _unitOfWork.CompleteAsync();
            
            return Ok(_mapper.Map<Model, ModelResource>(model));
        }

    }
}