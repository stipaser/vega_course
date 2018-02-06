using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using vega.Core;
using vega.Core.Models;
using vega.Models;

namespace vega.Persistence
{
    public class VehicleRepository : IVehicleRepository
    {
        private readonly VegaDbContext _context;

        public VehicleRepository(VegaDbContext context)
        {
            _context = context;
        }

        public async Task<Vehicle> GetVehicle(int id, bool includeRelated = true)
        {
            if (!includeRelated)
            {
                return await _context.Vehicles.FindAsync(id);
            }

            return await _context.Vehicles
                    .Include(x => x.VehicleFeatures)
                        .ThenInclude(x => x.Feature)
                    .Include(x => x.Model)
                        .ThenInclude(x => x.Make)
                    .SingleOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Vehicle> GetVehicleWithMake(int id)
        {
            return await _context.Vehicles
                .Include(x => x.Model)
                    .ThenInclude(x => x.Make)
                .SingleOrDefaultAsync(x => x.Id == id);
        }

        public void Add(Vehicle vehicle)
        {
            _context.Vehicles.Add(vehicle);
        }

        public void Remove(Vehicle vehicle)
        {
            _context.Remove(vehicle);
        }

        public async Task<IList<Vehicle>> GetVehicles(Filter filter)
        {
            var query = _context.Vehicles
                .Include(x => x.Model)
                .ThenInclude(x => x.Make)
                .Include(x => x.VehicleFeatures)
                .ThenInclude(x => x.Feature)
                .AsQueryable();

            if (filter.MakeId.HasValue)
                query = query.Where(x => x.Model.MakeId == filter.MakeId);

            return await query.ToListAsync();
        }
    }

}
