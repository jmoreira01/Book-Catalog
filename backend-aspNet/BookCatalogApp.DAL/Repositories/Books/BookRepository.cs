using BookCatalogApp.DAL.Context;
using BookCatalogApp.Infrastructure.Helpers;
using BookCatalogApp.Infrastructure.Interfaces.Repositories;
using BookCatalogApp.Models;
using Microsoft.EntityFrameworkCore;                                                            

namespace BookCatalogApp.DAL.Repositories.Books
{
    public class BookRepository : IBookRepository
    {
        private readonly MyDbContext _context;
        private IBookRepository _bookRepository;

        public BookRepository(MyDbContext context)
        {
            _context = context;
        }

        public async Task<Book?> Create(Book book)
        {
            await _context.Books.AddAsync(book);
            await _context.SaveChangesAsync();
            return book;
        }

        public async Task<bool> Exist(long id)
        {
            return await _context.Books.Where(x => x.IsDeleted == false).AnyAsync(x => x.Isbn == id);
        }

        public async Task<Book> Update(Book book)
        {
            _context.Entry<Book>(book).CurrentValues.SetValues(book);
            await _context.SaveChangesAsync();
            return book;
        }

        public async Task<Book?> GetById(int id)
        {
            return await _context.Books.FindAsync(id);
        }
        public async Task<PaginatedList<Book>> GetBooks(string sort, string search, int currentPage, int pageSize)
        {
            PaginatedList<Book> response = new PaginatedList<Book>();

            var query = _context.Books.Include(a => a.Author).AsQueryable();

            if (sort.Count() > 0 && sort != null)
            {
                switch (sort.ToLower())
                {
                    case "isbn":
                        query = query.OrderBy(x => x.Isbn);
                        break;
                    case "título":
                        query = query.OrderBy(x => x.Title);
                        break;
                    case "autor":
                        query = query.OrderBy(x => x.Author);
                        break;
                    case "preço":
                        query = query.OrderBy(x => x.Price);
                        break;
                    default:
                        query = query.OrderBy(x => x.Id);
                        break;
                }

            }
            if (search.Count() > 0)
            {
                search = search.ToLower().Trim();
                query = query.Where(n => 
                n.Title.Contains(search) 
                || n.Isbn.ToString().Contains(search) 
                || n.Price.ToString().Contains(search) 
                || n.Author.Contains(search));
            }

            response.TotalRecords = query.Count();

            var numberOfItemsToSkip = pageSize * (currentPage - 1);

            query = query.Skip(numberOfItemsToSkip);
            query = query.Take(pageSize);

            var list = await query.ToListAsync();

            response.Items = list;
            response.CurrentPage = currentPage;
            response.PageSize = pageSize;
            response.Success = true;
            response.Message = null;

            return response;
        }

    }
 
}
