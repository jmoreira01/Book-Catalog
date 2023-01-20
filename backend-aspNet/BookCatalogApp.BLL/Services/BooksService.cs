using BookCatalogApp.DAL.Context;
using BookCatalogApp.Infrastructure.Helpers;
using BookCatalogApp.Infrastructure.Interfaces.Repositories;
using BookCatalogApp.Infrastructure.Interfaces.Service;
using BookCatalogApp.Infrastructure.Models;

namespace BookCatalogApp.BLL.Services
{
    public class  BookService : IBookService

    {
        private readonly MyDbContext _context;
        private IBookService _bookService;
        private IBookRepository _bookRepository;

        public BookService(IBookRepository bookRepository, MyDbContext context)
        {
            _context = context;
            _bookRepository = bookRepository;
        }

        public async Task<MessagingHelper<int>> Create(CreateDTO createBook)
        {
            MessagingHelper<int> response = new();

            try
            {
                var responseValidate = await new CreateDTOValidator().ValidateAsync(createBook);
                if (responseValidate == null || responseValidate.IsValid == false)
                {
                    response.Message = responseValidate == null ? "Validation error! Try again." : responseValidate.Errors.FirstOrDefault()!.ErrorMessage;
                    response.Success = false;
                    return response;
                }
                var isbnExist = await _bookRepository.Exist(createBook.Isbn);
                if (isbnExist == true)
                {
                    response.Success = false;
                    response.Message = "ISBN already exist! Please try a different one";
                    return response;
                }
                
                var newBook = createBook.ToEntities();
                var assistanceInDB = await _bookRepository.Create(newBook);
                if (assistanceInDB == null)
                {
                    response.Message = "Error! Try again for a new Book!";
                    return response;
                }
                response.Success = true;
                response.Obj = assistanceInDB.Id;
                response.Message = "SUCCESS!";
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = "Error! Try again";
            }

            return response;
        }

        public async Task<MessagingHelper> Delete(DeleteDTO deleteDTO)
        {
            MessagingHelper result = new();
            try
            {
                var responseRepository = await _bookRepository.GetById(deleteDTO.Id);
                if (responseRepository == null)
                {
                    result.Success = false;
                    result.Message = "Book Not Found";
                    return result;
                }

                responseRepository.DeleteBook();
                await _context.SaveChangesAsync();
                result.Success = true;
                result.Message = "Livro deletado com sucesso";
                return result;

            }
            catch (Exception ex)
            {
                result.Success = false;
                result.Message = "Ocorreu um erro ao ir buscar livro";
            }

            return result;
        }

        public async Task<PaginatedList<ListDTO>> GetAll(Search search)
        {
            throw new NotImplementedException();
        }

        public async Task<MessagingHelper<BookDTO>> Update(EditDTO editBook)
        {
            throw new NotImplementedException();
        }
    }
}
