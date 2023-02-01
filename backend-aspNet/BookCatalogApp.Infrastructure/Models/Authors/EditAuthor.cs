using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookCatalogApp.Infrastructure.Models.Authors
{
    public class EditAuthor
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Country { get; set; }
    }
    public class EditAuthorValidator : AbstractValidator<EditAuthor>
    {
        public EditAuthorValidator()
        {
            RuleFor(x => x.Name).NotNull().WithMessage("Author Name").NotEmpty().WithMessage("Please, insert the Author Name");
            RuleFor(x => x.Country).NotNull().WithMessage("Author Country").NotEmpty().WithMessage("Please, insert the Author Country");
        }
    }
}
