using AutoMapper;
using vega.Controllers.Resources;
using vega.Models;
using System.Linq;
using System.Collections.Generic;

namespace vega.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Domain to API Resources

            CreateMap<Make, MakeResource>();
            // CreateMap<Model, ModelResource>();

            CreateMap<Vehicle, SaveVehicleResource>()
                .ForMember(x => x.Contact, opt => opt.MapFrom(src => 
                    new ContactResource  { Name = src.ContactName, Email = src.ContactEmail, Phone = src.ContactPhone }))
                  .ForMember(x => x.Features, opt => opt.MapFrom(src => src.VehicleFeatures.Select(x => x.FeatureId)));

            CreateMap<Vehicle, VehicleResource>()
                .ForMember(x => x.Contact,
                    opt => opt.MapFrom(src =>
                        new ContactResource
                        {
                            Name = src.ContactName,
                            Email = src.ContactEmail,
                            Phone = src.ContactPhone
                        }))
                // .ForMember(x => x.Model, opt => opt.MapFrom(src => src.Model))
                .ForMember(x => x.Make, opt => opt.MapFrom(src => src.Model.Make))
                .ForMember(x => x.VehicleFeatures, opt => opt.MapFrom(src => 
                    src.VehicleFeatures.Select(x => new FeatureResource{Id = x.Feature.Id, Name = x.Feature.Name})));


            // API Resources to Domain
            CreateMap<SaveVehicleResource, Vehicle>()
                .ForMember(x => x.Id, opt => opt.Ignore())
                .ForMember(x => x.ContactName, opt => opt.MapFrom(src => src.Contact.Name))
                .ForMember(x => x.ContactEmail, opt => opt.MapFrom(src => src.Contact.Email))
                .ForMember(x => x.ContactPhone, opt => opt.MapFrom(src => src.Contact.Phone))
                .ForMember(x => x.VehicleFeatures, opt => opt.Ignore())
                .AfterMap((vr, v) =>{
                    // Remove unselected features
                    var removedFeatures = v.VehicleFeatures.Where(x => !vr.Features.Contains(x.FeatureId)); // ???
                    foreach (var f in removedFeatures)
                        v.VehicleFeatures.Remove(f);

                    // Add new features
                    var addedFeatures = vr.Features.Where(id => !v.VehicleFeatures.Any(f => f.FeatureId == id)).Select(id => new VehicleFeature { FeatureId = id });   
                    foreach (var f in addedFeatures)
                        v.VehicleFeatures.Add(f);                            
                    });

        }
    }
}