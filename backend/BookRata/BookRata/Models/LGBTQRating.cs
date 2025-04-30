using System;
using System.Collections.Generic;

namespace BookRata.Models;

public partial class LGBTQRating
{
    public int LGBTQRatingId { get; set; }

    public int? BookId { get; set; }

    public string? TierRating { get; set; }

    public string? LGBTQReasoning { get; set; }

    public virtual Book? Book { get; set; }
}
