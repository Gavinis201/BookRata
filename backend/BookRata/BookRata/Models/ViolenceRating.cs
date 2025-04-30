using System;
using System.Collections.Generic;

namespace BookRata.Models;

public partial class ViolenceRating
{
    public int ViolenceRatingId { get; set; }

    public int? BookId { get; set; }

    public string? TierRating { get; set; }

    public string? ViolenceReasoning { get; set; }

    public virtual Book? Book { get; set; }
}
