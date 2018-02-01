using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace vega.Migrations
{
    public partial class SeedDatabase : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("INSERT INTO Makes (Name) VALUES ('BMW')");
            migrationBuilder.Sql("INSERT INTO Makes (Name) VALUES ('Audi')");
            migrationBuilder.Sql("INSERT INTO Makes (Name) VALUES ('Mercedes')");

            migrationBuilder.Sql("INSERT INTO Models (Name, MakeId) VALUES ('X4', (SELECT ID FROM Makes WHERE Name = 'BMW'))");
            migrationBuilder.Sql("INSERT INTO Models (Name, MakeId) VALUES ('X3', (SELECT ID FROM Makes WHERE Name = 'BMW'))");
            migrationBuilder.Sql("INSERT INTO Models (Name, MakeId) VALUES ('525d', (SELECT ID FROM Makes WHERE Name = 'BMW'))");

            migrationBuilder.Sql("INSERT INTO Models (Name, MakeId) VALUES ('A6', (SELECT ID FROM Makes WHERE Name = 'Audi'))");
            migrationBuilder.Sql("INSERT INTO Models (Name, MakeId) VALUES ('A4', (SELECT ID FROM Makes WHERE Name = 'Audi'))");
            migrationBuilder.Sql("INSERT INTO Models (Name, MakeId) VALUES ('A3', (SELECT ID FROM Makes WHERE Name = 'Audi'))");          
            
            migrationBuilder.Sql("INSERT INTO Models (Name, MakeId) VALUES ('CLS', (SELECT ID FROM Makes WHERE Name = 'Mercedes'))");
            migrationBuilder.Sql("INSERT INTO Models (Name, MakeId) VALUES ('E250', (SELECT ID FROM Makes WHERE Name = 'Mercedes'))");
            migrationBuilder.Sql("INSERT INTO Models (Name, MakeId) VALUES ('S500', (SELECT ID FROM Makes WHERE Name = 'Mercedes'))");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM Makes WHERE Name IN ('BMW', 'Audi', 'Mercedes')");
        }
    }
}
