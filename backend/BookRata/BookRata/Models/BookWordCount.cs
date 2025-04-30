using System;
using System.Collections.Generic;

namespace BookRata.Models;

public partial class BookWordCount
{
    public int CountId { get; set; }

    public int BookId { get; set; }

    public int WordId { get; set; }

    public int? Count { get; set; }

    public virtual Book Book { get; set; } = null!;

    public virtual SwearWord Word { get; set; } = null!;
}
