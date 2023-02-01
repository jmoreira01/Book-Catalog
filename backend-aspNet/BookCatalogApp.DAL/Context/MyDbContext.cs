using BookCatalogApp.Models;
using Microsoft.EntityFrameworkCore;

namespace BookCatalogApp.DAL.Context
{
    public class MyDbContext : DbContext
    {
        public DbSet<Book> Books { get; set; } = null!;

        public DbSet<Author> Authors { get; set; } = null!;



        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer
                (@"Data Source = (localdb)\MSSQLLocalDB; Initial Catalog = BookCatalogInitial; Integrated Security = True;");
        }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Book>().HasIndex(b => b.Isbn).IsUnique(); //ISBN Unico
            modelBuilder.Entity<Book>().Property<bool>("IsDeleted");
            modelBuilder.Entity<Book>().HasQueryFilter(m => EF.Property<bool>(m, "IsDeleted") == false); //SOFT Delete

            modelBuilder.Entity<Author>().Property<bool>("isDeleted");
            modelBuilder.Entity<Author>().HasQueryFilter(m => EF.Property<bool>(m, "isDeleted") == false);

            modelBuilder.Entity<Book>().HasData(
                new Book
                {
                    Id = 1,
                    Isbn = 9789899087545,
                    Title = "Cozinhar com Sobras",
                    AuthorId = "Joana Roque",
                    Price = 17.91M
                },

                new Book
                {
                    Id = 2,
                    Isbn = 9789897776588,
                    Title = "Torna-te o Amor da Tua Vida",
                    AuthorId = "Joana Gentil Martins",
                    Price = 14.31M
                },

                 new Book
                 {
                     Id = 3,
                     Isbn = 9789896237257,
                     Title = "Isto Começa Aqui",
                     AuthorId = "Colleen Hoover",
                     Price = 19.45M
                 }

                );
              
        }
    }
}
