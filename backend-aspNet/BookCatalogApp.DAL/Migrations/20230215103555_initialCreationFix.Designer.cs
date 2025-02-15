﻿// <auto-generated />
using BookCatalogApp.DAL.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace BookCatalogApp.DAL.Migrations
{
    [DbContext(typeof(MyDbContext))]
    [Migration("20230215103555_initialCreationFix")]
    partial class initialCreationFix
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("BookCatalogApp.Infrastructure.Entities.Author", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Country")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Authors");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Country = "Russia",
                            IsDeleted = false,
                            Name = "Joana Roque"
                        },
                        new
                        {
                            Id = 2,
                            Country = "Portugal",
                            IsDeleted = false,
                            Name = "Joana Gentil Martins"
                        },
                        new
                        {
                            Id = 3,
                            Country = "Portugal",
                            IsDeleted = false,
                            Name = "Colleen Hoover"
                        });
                });

            modelBuilder.Entity("BookCatalogApp.Models.Book", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("AuthorId")
                        .HasColumnType("int");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("bit");

                    b.Property<long>("Isbn")
                        .HasColumnType("bigint");

                    b.Property<decimal>("Price")
                        .HasColumnType("decimal(6, 2)");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("AuthorId");

                    b.HasIndex("Isbn")
                        .IsUnique();

                    b.ToTable("Books");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            AuthorId = 1,
                            IsDeleted = false,
                            Isbn = 9789899087545L,
                            Price = 17.91m,
                            Title = "Cozinhar com Sobras"
                        },
                        new
                        {
                            Id = 2,
                            AuthorId = 2,
                            IsDeleted = false,
                            Isbn = 9789897776588L,
                            Price = 14.31m,
                            Title = "Torna-te o Amor da Tua Vida"
                        },
                        new
                        {
                            Id = 3,
                            AuthorId = 3,
                            IsDeleted = false,
                            Isbn = 9789896237257L,
                            Price = 19.45m,
                            Title = "Isto Começa Aqui"
                        });
                });

            modelBuilder.Entity("BookCatalogApp.Models.Book", b =>
                {
                    b.HasOne("BookCatalogApp.Infrastructure.Entities.Author", "Author")
                        .WithMany("Books")
                        .HasForeignKey("AuthorId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Author");
                });

            modelBuilder.Entity("BookCatalogApp.Infrastructure.Entities.Author", b =>
                {
                    b.Navigation("Books");
                });
#pragma warning restore 612, 618
        }
    }
}
