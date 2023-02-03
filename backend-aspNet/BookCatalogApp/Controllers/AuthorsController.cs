using BookCatalogApp.BLL.Services.Authors;
using BookCatalogApp.Infrastructure.Helpers;
using BookCatalogApp.Infrastructure.Interfaces.Services;
using BookCatalogApp.Infrastructure.Models.Authors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookCatalogApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorsController : ControllerBase
    {
        private IAuthorService _authorService;

        public AuthorsController(IAuthorService authorService) 
        {
            _authorService = authorService;
        }
        
        [HttpPost("create")]
        public async Task<MessagingHelper<int>> Create(CreateAuthor createAuthor)
        {
            return await _authorService.Create(createAuthor);
        }

        [HttpPost("update")]
        public async Task<MessagingHelper<AuthorDTO>> Update(EditAuthor editAuthor)
        {
            return await _authorService.Update(editAuthor);
        }

        [HttpPost("delete")]
        public async Task<MessagingHelper> Delete(DeleteAuthor deleteAuthor)
        {
            return await _authorService.DeleteAuthor(deleteAuthor);
        }

        [HttpPost("getAuthors")]
        public async Task<PaginatedList<ListAuthor>> GetAuthors(Search search)
        {
            return await _authorService.GetAuthors(search);
        }

        [HttpGet("{id}")]
        public async Task<MessagingHelper<AuthorDTO>> GetById(int id)
        {
            return await _authorService.GetById(id);
        }

    }
}
