using BookCatalogApp.Infrastructure.Helpers;
using BookCatalogApp.Infrastructure.Interfaces.Service;
using BookCatalogApp.Infrastructure.Models.Books;
using BookCatalogApp.Models;
using Microsoft.AspNetCore.Mvc;


namespace CatalogoLivros.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private IBookService _bookService;

        public BooksController(IBookService bookService)
        {
            _bookService = bookService;
        }

        [HttpPost("getAll")]
        public async Task<PaginatedList<ListDTO>> GetAll(Search search)
        {
            return await _bookService.GetAll(search);
        }

        [HttpPost("create")]
        public async Task<MessagingHelper<int>> Create(CreateDTO createBook)
        {
            return await _bookService.Create(createBook);
        }

        [HttpPost("update")]
        public async Task<MessagingHelper<BookDTO>> Update(EditDTO editBook)
        {
            return await _bookService.Update(editBook);
        }

        [HttpPost("{id}")]

        public async Task<MessagingHelper<BookDTO>> GetById(int id)
        {

            return await _bookService.GetById(id);
        }


        [HttpPost("Delete")]
        public async Task<MessagingHelper> Delete(DeleteDTO deleteBook)
        {
            return await _bookService.Delete(deleteBook);
        }

    }
}
