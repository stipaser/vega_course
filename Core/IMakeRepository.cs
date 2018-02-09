using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using vega.Models;

namespace vega.Core
{
    public interface IMakeRepository
    {
        Task<IEnumerable<Make>> GetMakes();
        void Add(Make make);
        Task<Make> GetMakeById(int makeId);
    }
}
