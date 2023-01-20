using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookCatalogApp.Infrastructure.Helpers
{
    public class Search
    {
        public int CurrentPage { get; set; } = 1;
        public int PageSize { get; set; } = 4;
        public string Searching { get; set; } = "";
        public string Sorting { get; set; } = "";
    }
}
