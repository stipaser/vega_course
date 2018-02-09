using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using vega.Models;

namespace vega.Core
{
    public interface IModelRepository
    {
        void CreateModel(Model model);
        Task<Model> GetModelById(int modelId);
    }
}
