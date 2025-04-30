using System;
using System.Collections.Generic;

namespace BookRata.Models;

public partial class LanguageRating
{
    public int LanguageRatingId { get; set; }

    public int? BookId { get; set; }

    public string? TierRating { get; set; }

    public string? LanguageReasoning { get; set; }

    public virtual Book? Book { get; set; }
}
