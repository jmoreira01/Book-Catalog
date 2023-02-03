using FluentValidation;

namespace BookCatalogApp.Infrastructure.Models.Books
{
    public class EditDTO
    {
        public long Id { get; set; }
        public long Isbn { get; set; }
        public string Title { get; set; }
        public int AuthorId { get; set; }
        public decimal Price { get; set; }
    }
    public class EditDTOValidator : AbstractValidator<EditDTO> //changed to internal to solve the error
    {
        public EditDTOValidator()
        {
            RuleFor(x => x.Isbn)
                .NotNull()
                .WithMessage("Insert ISBN ")
                .NotEmpty()
                .WithMessage("Value must be 0 or higher.")
                .NotEmpty()
                .WithMessage("Please, fill in the blank field with the ISBN");

            RuleFor(x => x.Title)
                .NotNull()
                .WithMessage("Insert Title")
                .NotEmpty()
                .WithMessage("Please, fill in the blank field with the Title");

            RuleFor(x => x.AuthorId)
                .NotNull()
                .WithMessage("Insert Author")
                .NotEmpty()
                .WithMessage("Please, fill in the blank field with the Author");

            RuleFor(x => x.Price)
                .NotNull()
                .WithMessage("Insert Price")
                .GreaterThanOrEqualTo(0)
                .WithMessage("Value must be 0 or higher.")
                .NotEmpty()
                .WithMessage("Please, fill in the blank field with the price");
        }
    }
}
