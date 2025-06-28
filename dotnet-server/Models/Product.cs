using System.ComponentModel.DataAnnotations;

namespace CopiesServer.Models;

public class Product
{
    public int Id { get; set; }
    
    [Required]
    public string Name { get; set; } = string.Empty;
    
    public string? Description { get; set; }
    
    [Required]
    public decimal Price { get; set; }
    
    public int CategoryId { get; set; }
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    public virtual Category Category { get; set; } = null!;
}
