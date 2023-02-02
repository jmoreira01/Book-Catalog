using BookCatalogApp.Infrastructure.Entities;
using BookCatalogApp.Infrastructure.Helpers;
using BookCatalogApp.Infrastructure.Interfaces.Repositories;
using BookCatalogApp.DAL.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace BookCatalogApp.DAL.Repositories.Authors
{
    public class AuthorRepository : IAuthorRepository
    {
        private readonly MyDbContext _context;
        private IAuthorRepository _authorRepository;

        public AuthorRepository(MyDbContext context)
        {
            _context = context;
        }
        public async Task<Author?> Create(Author author)
        {
            await _context.Authors.AddAsync(author);
            await _context.SaveChangesAsync();
            return author;
        }

        public async Task<PaginatedList<Author>> GetAuthors(string sort, string search, int currentPage, int pageSize)
        {
            PaginatedList<Author> response = new PaginatedList<Author>();

            var query = _context.Authors.Include(b => b.Books).AsQueryable();

            if (sort.Count() > 0 && sort != null)
            {
                switch (sort.ToLower())
                {
                    case "name":
                        query = query.OrderBy(x => x.Name);
                        break;
                    case "country":
                        query = query.OrderBy(x => x.Country);
                        break;
                    default:
                        query = query.OrderBy(x => x.Id);
                        break;
                }

            }
            if (search.Count() > 0)
            {
                search = search.ToLower().Trim();
                query = query.Where(n => n.Name.Contains(search) || n.Country.Contains(search));

            }

            response.TotalRecords = query.Count();

            var numberOfItemsToSkip = pageSize * (currentPage - 1);

            query = query.Skip(numberOfItemsToSkip);
            query = query.Take(pageSize);

            var list = await query.ToListAsync();

            response.Items = list;
            response.CurrentPage = currentPage;
            response.PageSize = pageSize;
            response.Success = true;
            response.Message = null;

            return response;
        }


        public async Task<Author?> GetById(int id)
        {
            return await _context.Authors.FindAsync(id);
        }

        public async Task<Author> Update(Author author)
        {
            _context.Entry(author).CurrentValues.SetValues(author);
            await _context.SaveChangesAsync();
            return author;
        }
    }
}
