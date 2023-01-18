using BookCatalogApp.Models;
using Microsoft.EntityFrameworkCore;

namespace BookCatalogApp.DAL.Context
{
    public class MyDbContext : DbContext
    {
        public DbSet<Book> Books { get; set; }

        //public DbSet<Book> Authors { get; set; }



        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer
                (@"Data Source = (localdb)\MSSQLLocalDB; Initial Catalog = BookCatalogInitial; Integrated Security = True;");
        }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Book>().HasIndex(b => b.Isbn).IsUnique(); //ISBN Unico

            modelBuilder.Entity<Book>().Property<bool>("isDeleted");
            modelBuilder.Entity<Book>().HasQueryFilter(m => EF.Property<bool>(m, "isDeleted") == false); //SOFT Delete

            //modelBuilder.Entity<Author>().Property<bool>("isDeleted");
            //modelBuilder.Entity<Author>().HasQueryFilter(m => EF.Property<bool>(m, "isDeleted") == false);

            modelBuilder.Entity<Book>().HasData(
                new Book
                {
                    Id: 1,
                    Isbn: 9789899087545,
                    title: Cozinhar com Sobras,
                    Author: "Joana Roque",
                    Price: 17.91,
                    IsDeleted: false
                },

                new Book
                {
                    "id": 2,
                    "isbn": "9789897776588",
                    "title": "Torna-te o Amor da Tua Vida",
                    "author": "Joana Gentil Martins",
                    "price": 14.31,
                    "isDeleted": false
                },

                new Book
                {
                    "id": 3,
                    "isbn": "9789896237257",
                    "title": "Isto Começa Aqui",
                    "author": "Colleen Hoover",
                    "price": 19.45,
                    "isDeleted": false
                },

                new Book
                {
                    "id": 4,
                    "isbn": "9789898219657",
                    "title": "A Republicanização da Monarquia",
                    "author": "Maria de Fátima Bonifácio",
                    "price": 17.64,
                    "isDeleted": false
                },

                new Book
                {
                    "id": 5,
                    "isbn": "9789897111853",
                    "title": "O Acontecimento",
                    "author": "Annie Ernaux",
                    "price": 12.96,
                    "isDeleted": false
                },

                new Book
                {
                    "id": 6,
                    "isbn": "9789898860477",
                    "title": "Cabeça Fria, Coração Quente",
                    "author": "Vitor Castanheira",
                    "price": 22.41,
                    "isDeleted": false
                },

                new Book
                {
                    "id": 8,
                    "isbn": "9789898860477",
                    "title": "Cabeça Fria, Coração Quente",
                    "author": "Vitor Castanheira",
                    "price": 22.41,
                    "isDeleted": false
                },

                new Book
                {
                    "id": 10,
                    "isbn": "9789898860514",
                    "title": "Percebe a Dica, Dani Brown",
                    "author": "Talia Hibbert",
                    "price": 16.65,
                    "isDeleted": false
                },

                new Book
                {
                    "id": 11,
                    "isbn": "9789897833021",
                    "title": "O Retrato de Casamento",
                    "author": "Maggie O'Farrell",
                    "price": 17.15,
                    "isDeleted": false
                },

                new Book
                {
                    "id": 12,
                    "isbn": "9789895700837",
                    "title": "Silêncio Mortal",
                    "author": "Robert Bryndza",
                    "price": 17.51,
                    "isDeleted": false
                },

                new Book
                {
                    "id": 13,
                    "isbn": "9789897246623",
                    "title": "Twisted Games",
                    "author": "Ana Huang",
                    "price": 17.15,
                    "isDeleted": false
                },

                new Book
                {
                    "id": 14,
                    "isbn": "9789898860453",
                    "title": "De Olhos em Ti",
                    "author": "Amy Lea",
                    "price": 16.65,
                    "isDeleted": false
                },

                new Book
                {
                    "id": 15,
                    "isbn": "9789896235697",
                    "title": "Guerreira dos Céus e das Terras",
                    "author": "Addie Thorley",
                    "price": 18.41,
                    "isDeleted": false
                },
                
                new Book
                {
                    "id": 20,
                    "isbn": "9789897545863",
                    "title": "Mil Batidas do Coração",
                    "author": "Kiera Cass",
                    "price": 17.91,
                    "isDeleted": false

                },
                
                new Book
                {
                    "id": 21,
                    "isbn": "9789722544429",
                    "title": "O Reino dos Malditos",
                    "author": "Kerri Maniscalco",
                    "price": 16.92,
                    "isDeleted": false

                }
                );

        }
    }
}
