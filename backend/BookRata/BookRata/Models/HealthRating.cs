using System;
using System.Collections.Generic;

namespace BookRata.Models;

public partial class HealthRating
{
    public int HealthRatingId { get; set; }

    public int? BookId { get; set; }

    public string? TierRating { get; set; }

    public string? HealthReasoning { get; set; }

    public virtual Book? Book { get; set; }
}
