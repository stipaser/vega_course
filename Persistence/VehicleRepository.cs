using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using vega.Core;
using vega.Core.Models;
using vega.Extensions;
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

        public async Task<QueryResult<Vehicle>> GetVehicles(VehicleQuery queryObj)
        {
            var result = new QueryResult<Vehicle>();

            var query = _context.Vehicles
                .Include(x => x.Model)
                .ThenInclude(x => x.Make)
                .Include(x => x.VehicleFeatures)
                .ThenInclude(x => x.Feature)
                .AsQueryable();

            if (queryObj.MakeId.HasValue)
                query = query.Where(x => x.Model.MakeId == queryObj.MakeId);

            if (queryObj.ModelId.HasValue)
                query = query.Where(x => x.Model.Id == queryObj.ModelId);

            
            var columnsMap = new Dictionary<string, Expression<Func<Vehicle, object>>>()
            {
                ["make"] = vehicle => vehicle.Model.Make.Name,
                ["model"] = vehicle => vehicle.Model.Name,
                ["contactName"] = vehicle => vehicle.ContactName,
            };

            query = query.ApplyOrdering(queryObj, columnsMap);

            result.TotalItems = await query.CountAsync();

            query = query.ApplyPaging(queryObj);

            result.Items = await query.ToListAsync();

            return result;
        }
    }

}
