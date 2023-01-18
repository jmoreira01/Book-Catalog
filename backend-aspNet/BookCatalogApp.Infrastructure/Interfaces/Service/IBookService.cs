using BookCatalogApp.Infrastructure.Helpers;
using BookCatalogApp.Infrastructure.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookCatalogApp.Infrastructure.Interfaces.Service
{
    internal interface IBookService
    {
        Task<MessagingHelper<int>> Create(CreateDTO createDTO);
        Task<MessagingHelper<BookDTO>> Update(EditDTO editBook);
        Task<MessagingHelper<BookDTO>> Delete(DeleteDTO deleteDTO);
        Task<PaginatedList<ListDTO>> GetAll(Search search);

    }
}