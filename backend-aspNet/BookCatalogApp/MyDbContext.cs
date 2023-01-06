using BookCatalogApp.Models;
using Microsoft.EntityFrameworkCore;

namespace BookCatalogApp
{
    public class MyDbContext : DbContext
    {
        public DbSet<Book> Books { get; set; }

        // torna o ISBN unico
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Book>()
                        .HasIndex(b => b.ISBN)
                        .IsUnique();

            // softDelete
            modelBuilder.Entity<Book>()
                 .HasQueryFilter(book => EF.Property<bool>(book, "IsDeleted") == false);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {

            optionsBuilder.UseSqlServer
                (@"Data Source = (localdb)\MSSQLLocalDB; Initial Catalog = BookCatalogInitial; Integrated Security = True;");
        }
    }
}
