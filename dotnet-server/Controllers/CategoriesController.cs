using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CopiesServer.Data;
using CopiesServer.Models;

namespace CopiesServer.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriesController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public CategoriesController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
    {
        try
        {
            var categories = await _context.Categories
                .OrderBy(c => c.Name)
                .ToListAsync();
            
            return new JsonResult(categories.ToArray());
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error fetching categories: {ex.Message}");
            return Problem("Error fetching categories from database");
        }
    }
}
