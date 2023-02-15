using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace BookCatalogApp.DAL.Migrations
{
    /// <inheritdoc />
    public partial class initialCreationFix : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Authors",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Country = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Authors", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Books",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Isbn = table.Column<long>(type: "bigint", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(6,2)", nullable: false),
                    AuthorId = table.Column<int>(type: "int", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Books", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Books_Authors_AuthorId",
                        column: x => x.AuthorId,
                        principalTable: "Authors",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Authors",
                columns: new[] { "Id", "Country", "IsDeleted", "Name" },
                values: new object[,]
                {
                    { 1, "Russia", false, "Joana Roque" },
                    { 2, "Portugal", false, "Joana Gentil Martins" },
                    { 3, "Portugal", false, "Colleen Hoover" }
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

            migrationBuilder.CreateIndex(
                name: "IX_Books_AuthorId",
                table: "Books",
                column: "AuthorId");

            migrationBuilder.CreateIndex(
                name: "IX_Books_Isbn",
                table: "Books",
                column: "Isbn",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Books");

            migrationBuilder.DropTable(
                name: "Authors");
        }
    }
}
