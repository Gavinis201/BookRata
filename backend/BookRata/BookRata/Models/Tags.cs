using System.ComponentModel.DataAnnotations;

namespace BookRata.Models;

public class Tags
{
    [Required]
    public int TagId { get; set; }
    public string TagName { get; set; }
}