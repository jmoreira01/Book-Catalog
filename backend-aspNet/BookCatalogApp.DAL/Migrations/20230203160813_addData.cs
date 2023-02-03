using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace BookCatalogApp.DAL.Migrations
{
    /// <inheritdoc />
    public partial class addData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Authors",
                columns: new[] { "Id", "Country", "Name", "isDeleted" },
                values: new object[,]
                {
                    { 1, "Russia", "Joana Roque", false },
                    { 2, "Portugal", "Joana Gentil Martins", false },
                    { 3, "Portugal", "Colleen Hoover", false }
                });

            migrationBuilder.InsertData(
                table: "Books",
                columns: new[] { "Id", "AuthorId", "IsDeleted", "Isbn", "Price", "Title" },
                values: new object[,]
                {
                    { 1, 1, false, 9789899087545L, 17.91m, "Cozinhar com Sobras" },
                    { 2, 2, false, 9789897776588L, 14.31m, "Torna-te o Amor da Tua Vida" },
                    { 3, 3, false, 9789896237257L, 19.45m, "Isto Começa Aqui" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Authors",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Authors",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Authors",
                keyColumn: "Id",
                keyValue: 3);
        }
    }
}
