using System;
using System.Collections.Generic;

namespace BookRata.Models;

public partial class SynopsisReview
{
    public int SynopsisReviewId { get; set; }

    public int? SynopsisId { get; set; }

    public int? UserId { get; set; }

    public int? Rating { get; set; }

    public DateOnly? DateReviewed { get; set; }

    public virtual BookSynopsis? Synopsis { get; set; }

    public virtual User? User { get; set; }
}
