using System;
using System.Collections.Generic;

namespace BookRata.Models;

public partial class ReligionRating
{
    public int ReligionRatingId { get; set; }

    public int? BookId { get; set; }

    public string? TierRating { get; set; }

    public string? ReligionReasoning { get; set; }

    public virtual Book? Book { get; set; }
}
