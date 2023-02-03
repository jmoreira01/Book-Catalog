using BookCatalogApp.DAL.Context;
using BookCatalogApp.Infrastructure.Helpers;
using BookCatalogApp.Infrastructure.Interfaces.Repositories;
using BookCatalogApp.Infrastructure.Interfaces.Service;
using BookCatalogApp.Infrastructure.Models.Books;

namespace BookCatalogApp.BLL.Services.Books
{
    public class  BooksService : IBookService

    {
        private readonly MyDbContext _context;
        private IBookService _bookService;
        private IBookRepository _bookRepository;

        public BooksService(IBookRepository bookRepository, MyDbContext context)
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
                result.Message = "Deleted!";
                return result;

            }
            catch (Exception ex)
            {
                result.Success = false;
                result.Message = "Book search error!";
            }

            return result;
        }

        public async Task<PaginatedList<ListDTO>> GetAll(Search search)
        {
            PaginatedList<ListDTO> response = new();

            try
            {
                if (search.PageSize > 100)
                {
                    search.PageSize = 100;
                }

                if (search.PageSize <= 0)
                {
                    search.PageSize = 1;
                }

                if (search.CurrentPage <= 0)
                {
                    search.CurrentPage = 1;
                }

                var responseRepository = await _bookRepository.GetBooks(search.Sorting, search.Searching, search.CurrentPage, search.PageSize);
                if (responseRepository.Success != true)
                {
                    response.Success = false;
                    response.Message = "Error! No data to show.";
                    return response;
                }

                response.Items = responseRepository.Items.Select(t => new ListDTO(t)).ToList();
                response.PageSize = responseRepository.PageSize;
                response.CurrentPage = responseRepository.CurrentPage;
                response.TotalRecords = responseRepository.TotalRecords;
                response.Success = true;
            }
            catch (Exception ex)
            {

                response.Success = false;
                response.Message = "There was an error getting the books!";
            }

            return response;
        }

        public async Task<MessagingHelper<BookDTO>> GetById(int id)
        {
            MessagingHelper<BookDTO> result = new();
            try
            {
                var responseRepository = await _bookRepository.GetById(id);
                if (responseRepository == null)
                {
                    result.Success = false;
                    result.Message = "Error! No data to show.";
                    return result;
                }
                var bookResponse = new BookDTO(responseRepository);
                result.Obj = bookResponse;
                result.Success = true;
            }
            catch (Exception ex)
            {
                result.Success = false;
                result.Message = "There was an error getting the books!";
            }
            return result;
        }

        public async Task<MessagingHelper<BookDTO>> Update(EditDTO editBook)
        {
            MessagingHelper<BookDTO> result = new();
            try
            {
                EditDTOValidator validator = new();
                var responseValidator = validator.Validate(editBook);
                if (responseValidator.IsValid == false)
                {
                    result.Success = false;
                    result.Message = responseValidator.Errors.FirstOrDefault().ErrorMessage;
                    return result;
                }
                var bookDB = await _bookRepository.GetById((int)editBook.Id);
                if (bookDB == null)
                {
                    result.Message = "The book doesnt exist!";
                    return result;
                }
                if (editBook.Isbn == bookDB.Isbn && editBook.Title == bookDB.Title && editBook.Price == bookDB.Price && editBook.AuthorId == bookDB.AuthorId)
                {
                    result.Success = false;
                    result.Message = "No changes made!";
                    return result;
                }

                bookDB.Isbn = editBook.Isbn;
                bookDB.Title = editBook.Title;
                bookDB.AuthorId = editBook.AuthorId;
                bookDB.Price = editBook.Price;

                var bookUpDate = await _bookRepository.Update(bookDB);

                result.Success = true;
                result.Message = "EDITED!";
                result.Obj = new BookDTO(bookUpDate);

            }
            catch (Exception ex)
            {
                result.Success = false;
                result.Message = "Data has not been edited!";
            }

            return result;
        }
    }
}
