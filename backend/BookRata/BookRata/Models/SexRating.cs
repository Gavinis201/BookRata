using System;
using System.Collections.Generic;

namespace BookRata.Models;

public partial class SexRating
{
    public int SexRatingId { get; set; }

    public int? BookId { get; set; }

    public string? TierRating { get; set; }

    public string? SexReasoning { get; set; }

    public virtual Book? Book { get; set; }
}
