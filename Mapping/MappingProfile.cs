using AutoMapper;
using vega.Controllers.Resources;
using vega.Models;
using System.Linq;

namespace vega.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Domain to API Resources
                // CreateMap<Make, MakeResource>();
                // CreateMap<Model, ModelResource>();
            CreateMap<Vehicle, VehicleResource>()
                .ForMember(x => x.Contact, opt => opt.MapFrom(src => 
                    new ContactResource  { Name = src.ContactName, Email = src.ContactEmail, Phone = src.ContactPhone }))
                  .ForMember(x => x.Features, opt => opt.MapFrom(src => src.VehicleFeatures.Select(x => x.FeatureId)));                


            // API to Domain
            CreateMap<VehicleResource, Vehicle>()
                .ForMember(x => x.ContactName, opt => opt.MapFrom(src => src.Contact.Name))
                .ForMember(x => x.ContactEmail, opt => opt.MapFrom(src => src.Contact.Email))
                .ForMember(x => x.ContactPhone, opt => opt.MapFrom(src => src.Contact.Phone))
                .ForMember(x => x.VehicleFeatures, opt => opt.MapFrom(src => src.Features.Select(id => new VehicleFeature{ FeatureId = id })));


        }
    }
}