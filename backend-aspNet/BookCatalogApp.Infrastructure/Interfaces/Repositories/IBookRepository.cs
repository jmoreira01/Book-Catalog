using BookCatalogApp.Infrastructure.Helpers;
using BookCatalogApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookCatalogApp.Infrastructure.Interfaces.Repositories
{
    public interface IBookRepository
    {
        Task<bool> Exist(long id);
        Task<Book> Update(Book book);
        Task<Book?> GetById(int id);
        Task<Book?> Create(Book book);
        Task<PaginatedList<Book>> GetBooks(string searching, string sorting, int currentPage, int pageSize);
    }
}
