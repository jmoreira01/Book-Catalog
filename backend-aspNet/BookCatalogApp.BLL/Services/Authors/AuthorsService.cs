using BookCatalogApp.DAL.Context;
using BookCatalogApp.DAL.Repositories.Authors;
using BookCatalogApp.Infrastructure.Helpers;
using BookCatalogApp.Infrastructure.Interfaces.Repositories;
using BookCatalogApp.Infrastructure.Interfaces.Services;
using BookCatalogApp.Infrastructure.Models.Authors;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookCatalogApp.BLL.Services.Authors
{
    public class AuthorsService : IAuthorService
    {
        private readonly MyDbContext _context;
        private IAuthorRepository _authorRepository;
        private IAuthorService _authorService;

        public AuthorsService(IAuthorRepository authorRepository, MyDbContext context) 
        {
            _context = context;
            _authorRepository = authorRepository;
        }
        public async Task<MessagingHelper<int>> Create(CreateAuthor createAuthor)
        {
            MessagingHelper<int> response = new();

            try
            {
                var responseValidate = await new CreateAuthorValidator().ValidateAsync(createAuthor);
                if (responseValidate == null || responseValidate.IsValid == false)
                {
                    response.Message = responseValidate == null ? "Author validation error!" : responseValidate.Errors.FirstOrDefault()!.ErrorMessage;
                    response.Success = false;
                    return response;
                }

                var newAuthor = createAuthor.ToEntities();
                var authorInDB = await _authorRepository.Create(newAuthor);
                if (authorInDB == null)
                {
                    response.Message = "Author not created! Error!";
                    return response;
                }
                response.Success = true;
                response.Obj = authorInDB.Id;
                response.Message = "Success! New Author created!";
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = "Ocorreu um erro inesperado ao criar o autor";
            }

            return response;
        }

        public async Task<MessagingHelper> DeleteAuthor(DeleteAuthor deleteAuthor)
        {
            MessagingHelper result = new();
            try
            {
                var responseRepository = await _authorRepository.GetById(deleteAuthor.Id);
                if (responseRepository == null)
                {
                    result.Success = false;
                    result.Message = "Não foi possivel encontrar este autor";
                    return result;
                }

                responseRepository.DeleteAuthor();
                await _context.SaveChangesAsync();
                result.Success = true;
                result.Message = "Autor deletado com sucesso";
                return result;

            }
            catch (Exception ex)
            {
                result.Success = false;
                result.Message = "Ocorreu um erro ao ir buscar autor";
            }

            return result;
        }

        public async Task<PaginatedList<ListAuthor>> GetAuthors(Search search)
        {
            PaginatedList<ListAuthor> response = new();

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

                var responseRepository = await _authorRepository.GetAuthors(search.Sorting, search.Searching, search.CurrentPage, search.PageSize);
                if (responseRepository.Success != true)
                {
                    response.Success = false;
                    response.Message = "Erro ao obter a informação do autor";
                    return response;
                }

                response.Items = responseRepository.Items.Select(t => new ListAuthor(t)).ToList();
                response.PageSize = responseRepository.PageSize;
                response.CurrentPage = responseRepository.CurrentPage;
                response.TotalRecords = responseRepository.TotalRecords;
                response.Success = true;
            }
            catch (Exception ex)
            {

                response.Success = false;
                response.Message = "Ocorreu um erro ao obter os autores.";
            }

            return response;
        }

        public async Task<MessagingHelper<AuthorDTO>> GetById(int id)
        {
            MessagingHelper<AuthorDTO> result = new();
            try
            {
                var responseRepository = await _authorRepository.GetById(id);
                if (responseRepository == null)
                {
                    result.Success = false;
                    result.Message = "Não foi possivel encontrar este autor";
                    return result;
                }
                var authorResponse = new AuthorDTO(responseRepository);
                result.Obj = authorResponse;
                result.Success = true;
            }
            catch (Exception ex)
            {
                result.Success = false;
                result.Message = "Ocorreu um erro ao ir buscar o autor";
            }
            return result;
        }

        public async Task<MessagingHelper<AuthorDTO>> Update(EditAuthor editAuthor)
        {
            MessagingHelper<AuthorDTO> result = new();
            try
            {
                EditAuthorValidator validator = new();
                var responseValidator = validator.Validate(editAuthor);
                if (responseValidator.IsValid == false)
                {
                    result.Success = false;
                    result.Message = responseValidator.Errors.FirstOrDefault().ErrorMessage;
                    return result;
                }
                var authorDB = await _authorRepository.GetById(editAuthor.Id);
                if (authorDB == null)
                {
                    result.Message = "Este autor não existe";
                    return result;
                }
                if (editAuthor.Name == authorDB.Name && editAuthor.Country == authorDB.Country)

                {
                    result.Success = false;
                    result.Message = "Nenhuma alteração feita";
                    return result;
                }

                authorDB.Name = editAuthor.Name;
                authorDB.Country = editAuthor.Country;

                var authorUpDate = await _authorRepository.Update(authorDB);

                result.Success = true;
                result.Message = "Autor editado com sucesso";
                result.Obj = new AuthorDTO(authorUpDate);

            }
            catch (Exception ex)
            {
                result.Success = false;
                result.Message = "Erro ao editar o autor";
            }

            return result;
        }
    }
}
