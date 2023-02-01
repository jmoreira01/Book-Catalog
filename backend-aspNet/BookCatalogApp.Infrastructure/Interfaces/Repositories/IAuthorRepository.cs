using BookCatalogApp.Infrastructure.Entities;
using BookCatalogApp.Infrastructure.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookCatalogApp.Infrastructure.Interfaces.Repositories
{
    public interface IAuthorRepository
    {
        Task<PaginatedList<Author>> GetAuthors(string sorting, string searching, int currentPage, int pageSize);
        Task<Author?> Create(Author author);
        Task<Author?> GetById(int id);
        Task<Author> Update(Author author);
    }
}
