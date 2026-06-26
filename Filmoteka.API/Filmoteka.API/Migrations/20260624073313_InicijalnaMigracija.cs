using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Filmoteka.API.Migrations
{
    /// <inheritdoc />
    public partial class InicijalnaMigracija : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Korisnici",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    KorisnickoIme = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Lozinka = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Uloga = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Korisnici", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Zanrovi",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Zanrovi", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Filmovi",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Godina = table.Column<int>(type: "int", nullable: false),
                    ZanrId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Filmovi", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Filmovi_Zanrovi_ZanrId",
                        column: x => x.ZanrId,
                        principalTable: "Zanrovi",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Korisnici",
                columns: new[] { "Id", "KorisnickoIme", "Lozinka", "Uloga" },
                values: new object[] { 1, "admin", "admin123", "Admin" });

            migrationBuilder.InsertData(
                table: "Zanrovi",
                columns: new[] { "Id", "Naziv" },
                values: new object[,]
                {
                    { 1, "Akcija" },
                    { 2, "Sci-Fi" },
                    { 3, "Drama" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Filmovi_ZanrId",
                table: "Filmovi",
                column: "ZanrId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Filmovi");

            migrationBuilder.DropTable(
                name: "Korisnici");

            migrationBuilder.DropTable(
                name: "Zanrovi");
        }
    }
}
