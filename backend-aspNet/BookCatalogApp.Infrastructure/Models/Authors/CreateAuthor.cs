using BookCatalogApp.Infrastructure.Entities;
using FluentValidation;


namespace BookCatalogApp.Infrastructure.Models.Authors
{
    public class CreateAuthor
    {
        public string Name { get; set; }
        public string Country { get; set; }
        public Author ToEntities()
        {
            var author = new Author();
            author.Name = Name;
            author.Country = Country;
            return author;
        }
    }
    public class CreateAuthorValidator : AbstractValidator<CreateAuthor>
    {
        public CreateAuthorValidator()
        {
            RuleFor(x => x.Name).NotNull().WithMessage("Insert Author Name").NotEmpty().WithMessage("Please, insert Author Name");
            RuleFor(x => x.Country).NotNull().WithMessage("Insert Author Country").NotEmpty().WithMessage("Please, insert Author Country");
        }
    }
}
