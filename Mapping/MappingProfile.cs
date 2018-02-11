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
            CreateMap<Model, ModelResource>();

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
                .ForMember(x => x.Make, opt => opt.MapFrom(src => src.Model.Make))
                .ForMember(x => x.VehicleFeatures, opt => opt.MapFrom(src => 
                    src.VehicleFeatures.Select(x => new FeatureResource{Id = x.Feature.Id, Name = x.Feature.Name})));


            // API Resources to Domain
            CreateMap<ModelResource, Model>();
            CreateMap<FeatureResource, Feature>();

            CreateMap<SaveVehicleResource, Vehicle>()
                .ForMember(x => x.Id, opt => opt.Ignore())
                .ForMember(x => x.ContactName, opt => opt.MapFrom(src => src.Contact.Name))
                .ForMember(x => x.ContactEmail, opt => opt.MapFrom(src => src.Contact.Email))
                .ForMember(x => x.ContactPhone, opt => opt.MapFrom(src => src.Contact.Phone))
                .ForMember(x => x.VehicleFeatures, opt => opt.Ignore())
                .AfterMap((vr, v) => {

                    // Remove unselected features
                    var removedFeatures = v.VehicleFeatures.Where(vf => !vr.Features.Contains(vf.FeatureId)).ToList(); 
                    foreach (var feature in removedFeatures)
                        v.VehicleFeatures.Remove(feature);

                    // Add new features
                    var addedFeatures = vr.Features.Where(id => !v.VehicleFeatures.Any(f => f.FeatureId == id)).Select(id => new VehicleFeature { FeatureId = id }).ToList();   
                    foreach (var f in addedFeatures)
                        v.VehicleFeatures.Add(f);                            
                    });

        }
    }
}