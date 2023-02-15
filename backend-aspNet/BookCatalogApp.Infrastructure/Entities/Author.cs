using BookCatalogApp.Models;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;


namespace BookCatalogApp.Infrastructure.Entities
{
    public class Author
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<Book> Books { get; set; }
        public string Country { get; set; }
        
        [DefaultValue(false)]
        public bool IsDeleted { get; set; }

        public void DeleteAuthor()
        {
            this.IsDeleted = true;
        }
    }
}
