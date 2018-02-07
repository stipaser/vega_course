using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace vega.Controllers.Resources
{
    public class QueryResultResource<T>
    {
        public int TotalItems { get; set; }
        public IList<T> Items { get; set; }
    }
}
