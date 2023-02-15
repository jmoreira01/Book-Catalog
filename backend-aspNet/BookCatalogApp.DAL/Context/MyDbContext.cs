using BookCatalogApp.Infrastructure.Entities;
using BookCatalogApp.Models;
using Microsoft.EntityFrameworkCore;

namespace BookCatalogApp.DAL.Context
{
    public class MyDbContext : DbContext
    {
        public DbSet<Book> Books { get; set; }
        public DbSet<Author> Authors { get; set; }



        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer
                (@"Data Source = (localdb)\MSSQLLocalDB; Initial Catalog = BookCatalogApp; Integrated Security = True;");
        }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Book>().HasIndex(b => b.Isbn).IsUnique(); //ISBN Unique
            modelBuilder.Entity<Book>().Property<bool>("IsDeleted");
            modelBuilder.Entity<Book>().HasQueryFilter(m => EF.Property<bool>(m, "IsDeleted") == false); //SOFT Delete

            modelBuilder.Entity<Author>().Property<bool>("IsDeleted");
            modelBuilder.Entity<Author>().HasQueryFilter(m => EF.Property<bool>(m, "IsDeleted") == false); //SOFT Delete


            modelBuilder.Entity<Author>().HasData(

               new Author
               {
                   Id = 1,
                   Name = "Joana Roque",
                   Country = "Russia"
               },
               new Author
               {
                   Id = 2,
                   Name = "Joana Gentil Martins",
                   Country = "Portugal"
               },
               new Author
               {
                   Id = 3,
                   Name = "Colleen Hoover",
                   Country = "Portugal"
               }
           );
            modelBuilder.Entity<Book>().HasData(
                new Book
                {
                    Id = 1,
                    Isbn = 9789899087545,
                    Title = "Cozinhar com Sobras",
                    AuthorId = 1,
                    Price = 17.91M
                },

                new Book
                {
                    Id = 2,
                    Isbn = 9789897776588,
                    Title = "Torna-te o Amor da Tua Vida",
                    AuthorId = 2,
                    Price = 14.31M
                },

                 new Book
                 {
                     Id = 3,
                     Isbn = 9789896237257,
                     Title = "Isto Começa Aqui",
                     AuthorId = 3,
                     Price = 19.45M
                 }

                );

        }

        public override int SaveChanges()
        {
            UpdateSoftDeleteStatuses();
            return base.SaveChanges();
        }

        public override Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = default(CancellationToken))
        {
            UpdateSoftDeleteStatuses();
            return base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
        }

        private void UpdateSoftDeleteStatuses()
        {
            foreach (var entry in ChangeTracker.Entries())
            {
                switch (entry.State)
                {
                    case EntityState.Added:
                        entry.CurrentValues["IsDeleted"] = false;
                        break;
                    case EntityState.Deleted:
                        entry.State = EntityState.Modified;
                        entry.CurrentValues["IsDeleted"] = true;
                        break;
                }
            }
        }
    }
}
