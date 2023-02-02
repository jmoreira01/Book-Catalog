using BookCatalogApp.Infrastructure.Helpers;
using BookCatalogApp.Infrastructure.Models.Books;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookCatalogApp.Infrastructure.Interfaces.Service
{
    public interface IBookService
    {
        Task<MessagingHelper<BookDTO>> GetById(int id);
        Task<PaginatedList<ListDTO>> GetAll(Search search);
        Task<MessagingHelper<int>> Create(CreateDTO createBook);
        Task<MessagingHelper<BookDTO>> Update(EditDTO editBook);
        Task<MessagingHelper> Delete(DeleteDTO deleteBook);
        

    }
}