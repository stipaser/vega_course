using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using vega.Core;
using vega.Models;

namespace vega.Persistence
{
    public class ModelRepository : IModelRepository
    {
        private readonly VegaDbContext _context;

        public ModelRepository(VegaDbContext context)
        {
            _context = context;
        }
        public void CreateModel(Model model)
        {
            _context.Add(model);
        }

        public async Task<Model> GetModelById(int modelId)
        {
            return await _context.Models.SingleOrDefaultAsync(x => x.Id == modelId);
        }
    }
}
