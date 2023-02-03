using BookCatalogApp.BLL.Services.Authors;
using BookCatalogApp.BLL.Services.Books;
using BookCatalogApp.DAL.Context;
using BookCatalogApp.DAL.Repositories.Authors;
using BookCatalogApp.DAL.Repositories.Books;
using BookCatalogApp.Infrastructure.Interfaces.Repositories;
using BookCatalogApp.Infrastructure.Interfaces.Service;
using BookCatalogApp.Infrastructure.Interfaces.Services;
using System;

var builder = WebApplication.CreateBuilder(args);

//Interface and Services


// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<MyDbContext>();

builder.Services.AddScoped<IBookService, BooksService>();
builder.Services.AddScoped<IBookRepository, BookRepository>();
builder.Services.AddScoped<IAuthorService, AuthorsService>();
builder.Services.AddScoped<IAuthorRepository, AuthorRepository>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(options =>
{
    options.WithOrigins("http://localhost:3000");
    options.AllowAnyMethod();
    options.AllowAnyHeader();
});

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
