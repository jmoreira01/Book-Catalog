using BookCatalogApp.Infrastructure.Helpers;
using BookCatalogApp.Infrastructure.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookCatalogApp.Infrastructure.Interfaces.Service
{
    public interface IBookService
    {
        Task<MessagingHelper<int>> Create(CreateDTO createBook);
        Task<MessagingHelper<BookDTO>> Update(EditDTO editBook);
        Task<MessagingHelper> Delete(DeleteDTO deleteBook);
        Task<PaginatedList<ListDTO>> GetAll(Search search);

    }
}