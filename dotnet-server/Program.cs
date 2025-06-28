using Microsoft.EntityFrameworkCore;
using CopiesServer.Data;

var builder = WebApplication.CreateBuilder(args);

// Add Controllers
builder.Services.AddControllers();

// Add Entity Framework with SQL Server
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy =>
        {
            policy.AllowAnyOrigin()
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

var app = builder.Build();

app.UseCors("AllowAll");

// Map Controllers
app.MapControllers();

// Ensure database is created and seeded
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    try
    {
        Console.WriteLine("Initializing SQL Server database...");
        context.Database.EnsureCreated();
        Console.WriteLine("Database initialized successfully");
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Error initializing database: {ex.Message}");
    }
}

Console.WriteLine(".NET 8 + Entity Framework + SQL Server API ready");
Console.WriteLine("Server running on: http://localhost:5001");
Console.WriteLine("Available endpoints:");
Console.WriteLine("GET /api/categories");
Console.WriteLine("GET /api/products/{categoryId}");

app.Run("http://localhost:5001");
