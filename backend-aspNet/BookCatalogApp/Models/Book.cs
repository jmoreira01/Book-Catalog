using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using ServiceStack.DataAnnotations;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookCatalogApp.Models

{
    public class Book
    {
        [Key]
        public int Id { get; set; }

        [System.ComponentModel.DataAnnotations.Required]
        [Unique]
        public string ISBN { get; set; } = null!;

        [System.ComponentModel.DataAnnotations.Required]
        public string Title { get; set; } = null!;

        [System.ComponentModel.DataAnnotations.Required]
        public string Author { get; set; } = null!;

        [System.ComponentModel.DataAnnotations.Required]
        public decimal Price { get; set; }

        // [JsonIgnore] para esconder a propriedade (teste)
        public bool IsDeleted { get; set; }
    }
}
