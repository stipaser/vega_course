using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using vega.Controllers.Resources;
using vega.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using vega.Core;
using vega.Core.Models;

namespace vega.Controllers
{
    [Route("/api/vehicles")]
    public class VehiclesController : Controller
    {
        private readonly IMapper _mapper;
        private readonly IVehicleRepository _vehicleRepository;
        private readonly IUnitOfWork _unitOfWork;

        public VehiclesController(IMapper mapper, IVehicleRepository vehicleRepository, IUnitOfWork unitOfWork)
        {
            _vehicleRepository = vehicleRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> CreateVehicle([FromBody] SaveVehicleResource saveVehicleResource)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            // var model = context.Models.Find(saveVehicleResource.ModelId);
            // if(model == null)
            // {
            //     ModelState.AddModelError("ModelId", "Invalid model.Id");
            //     return BadRequest(ModelState);
            // }
            
            var vehicle = _mapper.Map<SaveVehicleResource, Vehicle>(saveVehicleResource);
            vehicle.LastUpdate = DateTime.Now;

            _vehicleRepository.Add(vehicle);
            await _unitOfWork.CompleteAsync();

            vehicle = await _vehicleRepository.GetVehicle(vehicle.Id);
            var result = _mapper.Map<Vehicle, VehicleResource>(vehicle);

            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateVehicle(int id, [FromBody] SaveVehicleResource saveVehicleResource)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);
            
            var vehicle = await _vehicleRepository.GetVehicle(id);

            if (vehicle == null)
                return NotFound();
            
            _mapper.Map<SaveVehicleResource, Vehicle>(saveVehicleResource, vehicle);
            vehicle.LastUpdate = DateTime.Now;

            await _unitOfWork.CompleteAsync();

            vehicle = await _vehicleRepository.GetVehicle(vehicle.Id);
            var result = _mapper.Map<Vehicle, VehicleResource>(vehicle);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVehicle(int id)
        {
            var vehicle =  await _vehicleRepository.GetVehicle(id, includeRelated: false);

            if(vehicle == null)
                return NotFound();

            _vehicleRepository.Remove(vehicle);
            await _unitOfWork.CompleteAsync();

            return Ok(id);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetVehicle(int id)
        {
            var vehicle =  await _vehicleRepository.GetVehicle(id);

            if(vehicle == null)
                return NotFound();
           
            var vehicleResource = _mapper.Map<Vehicle, VehicleResource>(vehicle);

            return Ok(vehicleResource);
        }

        [HttpGet]
        public async Task<IActionResult> GetVehicles(VehicleQueryResource vehicleQueryResource)
        {
            var vehicleQuery = _mapper.Map<VehicleQueryResource, VehicleQuery>(vehicleQueryResource);
            var qureyResult = await _vehicleRepository.GetVehicles(vehicleQuery);

            if (qureyResult == null)
                return NotFound();

            var qureyResultResource = _mapper.Map<QueryResult<Vehicle>, QueryResultResource<VehicleResource>>(qureyResult);

            return Ok(qureyResultResource);
        }
    }
}