using Microsoft.EntityFrameworkCore;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
public class MyTask
{
    public MyTask() { 

        CreatedAt = DateTime.UtcNow;
        DueDate = DateTime.UtcNow;
    }
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    
    [Required]
    public string Title { get; set; }
    
    [Required]
    [StringLength(Int32.MaxValue,MinimumLength = 10, ErrorMessage = "Description must be at least 10 characters long")]
    public string Description { get; set; }
    public bool IsCompleted { get; set; }
    
    [DataType(DataType.Date)]
    public DateTime CreatedAt { get; set; }
    
    [DataType(DataType.Date)]
    public DateTime UpdatedAt { get; set; }
    
    [DataType(DataType.Date)]
    public DateTime DueDate { get; set; }
}