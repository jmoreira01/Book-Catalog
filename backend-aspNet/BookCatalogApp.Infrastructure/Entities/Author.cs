using BookCatalogApp.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookCatalogApp.Infrastructure.Entities
{
    public class Author
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }
        public ICollection<Book> Books { get; set; } = null!;
        public string Country { get; set; }
        
        [DefaultValue(false)]
        public bool isDeleted { get; set; }

        public void DeleteAuthor()
        {
            this.isDeleted = true;
        }
    }
}
