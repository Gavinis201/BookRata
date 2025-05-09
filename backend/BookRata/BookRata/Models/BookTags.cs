namespace BookRata.Models;

public class BookTags
{
    public int BookId { get; set; }
    
    public int TagId { get; set; }

    public virtual Book Book { get; set; } = null!;
    public virtual Tags Tag { get; set; } = null!;
}