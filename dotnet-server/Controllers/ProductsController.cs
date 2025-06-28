using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CopiesServer.Data;
using CopiesServer.Models;

namespace CopiesServer.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public ProductsController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet("{categoryId}")]
    public async Task<ActionResult<IEnumerable<Product>>> GetProductsByCategory(int categoryId)
    {
        try
        {
            var products = await _context.Products
                .Where(p => p.CategoryId == categoryId)
                .OrderBy(p => p.Name)
                .ToListAsync();
            
            return Ok(products);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error fetching products: {ex.Message}");
            return Problem("Error fetching products from database");
        }
    }
}
