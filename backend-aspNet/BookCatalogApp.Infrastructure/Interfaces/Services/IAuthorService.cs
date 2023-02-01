using BookCatalogApp.Infrastructure.Helpers;
using BookCatalogApp.Infrastructure.Models.Authors;
using BookCatalogApp.Infrastructure.Models.Books;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookCatalogApp.Infrastructure.Interfaces.Services
{
    public interface IAuthorService
    {
        Task<PaginatedList<ListAuthor>> GetAuthors(Search search);
        Task<MessagingHelper<int>> Create(CreateAuthor createAuthor);
        Task<MessagingHelper<AuthorDTO>> Update(EditAuthor editAuthor);
        Task<MessagingHelper> DeleteAuthor(DeleteAuthor deleteAuthor);
        Task<MessagingHelper<AuthorDTO>> GetById(int id);
    }
}