using System;
using System.Collections.Generic;

namespace BookRata.Models;

public partial class SwearWord
{
    public int WordId { get; set; }

    public string Word { get; set; } = null!;

    public virtual ICollection<BookWordCount> BookWordCounts { get; set; } = new List<BookWordCount>();
}
