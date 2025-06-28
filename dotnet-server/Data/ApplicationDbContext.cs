using Microsoft.EntityFrameworkCore;
using CopiesServer.Models;

namespace CopiesServer.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    public DbSet<Category> Categories { get; set; }
    public DbSet<Product> Products { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configure Category validation and relationships
        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(c => c.Id);
            entity.Property(c => c.Name).IsRequired().HasMaxLength(100);
            entity.Property(c => c.Description).HasMaxLength(500);
        });

        // Configure Product
        modelBuilder.Entity<Product>(entity =>
        {
            entity.HasKey(p => p.Id);
            entity.Property(p => p.Name).IsRequired().HasMaxLength(200);
            entity.Property(p => p.Description).HasMaxLength(1000);
            entity.Property(p => p.Price).HasColumnType("decimal(18,2)");
            
            // Configure relationship
            entity.HasOne(p => p.Category)
                  .WithMany(c => c.Products)
                  .HasForeignKey(p => p.CategoryId)
                  .OnDelete(DeleteBehavior.Cascade);
        });

        // Seed data
        modelBuilder.Entity<Category>().HasData(
            new Category { Id = 1, Name = "הדפסות", Description = "שירותי הדפסה שונים" },
            new Category { Id = 2, Name = "צילומים", Description = "שירותי צילום ועיבוד תמונות" },
            new Category { Id = 3, Name = "כריכות", Description = "שירותי כריכה למסמכים" }
        );

        modelBuilder.Entity<Product>().HasData(
            // printing 
            new Product { Id = 1, Name = "הדפסה שחור לבן", Description = "הדפסה איכותית A4", Price = 0.50m, CategoryId = 1 },
            new Product { Id = 2, Name = "הדפסה צבעונית", Description = "הדפסה צבעונית A4", Price = 2.00m, CategoryId = 1 },
            new Product { Id = 3, Name = "הדפסה A3", Description = "הדפסה גדולה A3", Price = 1.50m, CategoryId = 1 },
            
            // photocopying 
            new Product { Id = 4, Name = "צילום מסמכים", Description = "צילום מסמכים רגילים", Price = 1.00m, CategoryId = 2 },
            new Product { Id = 5, Name = "צילום תמונות", Description = "צילום תמונות איכותי", Price = 3.00m, CategoryId = 2 },
            
            // binding 
            new Product { Id = 6, Name = "כריכה רגילה", Description = "כריכה פשוטה למסמכים", Price = 5.00m, CategoryId = 3 },
            new Product { Id = 7, Name = "כריכה ספירלה", Description = "כריכה ספירלה מתקדמת", Price = 8.00m, CategoryId = 3 }
        );
    }
}
