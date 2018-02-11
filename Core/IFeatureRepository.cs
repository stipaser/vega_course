using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using vega.Models;

namespace vega.Core
{
    public interface IFeatureRepository
    {
        Task<IEnumerable<Feature>> GetFeatures();
        void Add(Feature feature);
        Task<Feature> GetFeatureById(int makeId);
    }
}
