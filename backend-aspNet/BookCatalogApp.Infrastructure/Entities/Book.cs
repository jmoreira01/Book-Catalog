﻿using BookCatalogApp.Infrastructure.Entities;
using ServiceStack.DataAnnotations;
using System.ComponentModel;
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
        public long Isbn { get; set; }

        [System.ComponentModel.DataAnnotations.Required]
        public string Title { get; set; } = null!;

        [System.ComponentModel.DataAnnotations.Required]
        [System.ComponentModel.DataAnnotations.Range(0, 999999, ErrorMessage = "Value must be between {0} and {1}. Can´t be negative!")]
        [Column(TypeName = "decimal(6, 2)")]
        public decimal Price { get; set; }

        public int AuthorId { get; set; }

        public Author Author { get; set; } = null!;


        [DefaultValue(false)]
        public bool IsDeleted { get; set; }

        public void DeleteBook()
        {
            this.IsDeleted = true;
        }
    }
}
