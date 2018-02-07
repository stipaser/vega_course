
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using vega.Controllers.Resources;
using vega.Core;
using vega.Core.Models;

namespace vega.Controllers
{
    [Route("/api/vehicles/{vehicleId}/photos")]
    public class PhotoController : Controller
    {
        private readonly IHostingEnvironment _host;
        private readonly IVehicleRepository _vehicleRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IPhotoRepository _photoRepository;
        private readonly PhotoSettings _photoSettings ;

        public PhotoController(IHostingEnvironment host, IVehicleRepository vehicleRepository,
            IUnitOfWork unitOfWork, IMapper mapper, IOptionsSnapshot<PhotoSettings> options, IPhotoRepository photoRepository)
        {
            _host = host;
            _vehicleRepository = vehicleRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _photoRepository = photoRepository;
            _photoSettings = options.Value;
        }

        [HttpGet]
        public async Task<IActionResult> GetPhotos(int vehicleId)
        {
            var photos = await _photoRepository.GetPhotos(vehicleId);
            return Ok(_mapper.Map<IEnumerable<Photo>, IEnumerable<PhotoResource>>(photos));
        }

        [HttpPost]
        public async Task<IActionResult> Upload(int vehicleId, IFormFile file)
        {
            var vehicle = await _vehicleRepository.GetVehicle(vehicleId, includeRelated: false);
            if (vehicle == null)
                return NotFound();

            if (file == null) return BadRequest("Null file.");
            if (file.Length == 0) return BadRequest("Empty file.");
            if(file.Length > _photoSettings.MaxBytes) return BadRequest("Max file size exceeded.");
            if(!_photoSettings.IsSupported(file.FileName)) return BadRequest("Invalid file type.");


            var uploadFolderPath = Path.Combine(_host.WebRootPath, "uploads");
            if (!Directory.Exists(uploadFolderPath))
                Directory.CreateDirectory(uploadFolderPath);

            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
            var filePath = Path.Combine(uploadFolderPath, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            var photo = new Photo {FileName = fileName};

            vehicle.Photos.Add(photo);
            await _unitOfWork.CompleteAsync();

            var photoResource = _mapper.Map<Photo, PhotoResource>(photo);

            return Ok(photoResource);
        }
    }
}