using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using vega.Models;

namespace vega.Core.Models
{
    public class QueryResult<T>
    {
        public int TotalItems { get; set; }
        public IList<T> Items { get; set; }
    }
}
