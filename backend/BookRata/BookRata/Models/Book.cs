using System;
using System.Collections.Generic;

namespace BookRata.Models;

public partial class Book
{
    public int BookId { get; set; }

    public string? Title { get; set; }

    public string? Author { get; set; }


    public string? ISBN { get; set; }

    public string? TextUrl { get; set; }

    public string? BookSummary { get; set; }

    public string? OverallTier { get; set; }

    public DateTime? ReviewDate { get; set; }

    public DateOnly? PublishDate { get; set; }

    public virtual ICollection<BookSynopsis> BookSynopses { get; set; } = new List<BookSynopsis>();

    public virtual ICollection<BookWordCount> BookWordCounts { get; set; } = new List<BookWordCount>();

    public virtual ICollection<HealthRating> HealthRatings { get; set; } = new List<HealthRating>();

    public virtual ICollection<LGBTQRating> LGBTQRatings { get; set; } = new List<LGBTQRating>();

    public virtual ICollection<LanguageRating> LanguageRatings { get; set; } = new List<LanguageRating>();

    public virtual ICollection<ReligionRating> ReligionRatings { get; set; } = new List<ReligionRating>();

    public virtual ICollection<SexRating> SexRatings { get; set; } = new List<SexRating>();

    public virtual ICollection<ViolenceRating> ViolenceRatings { get; set; } = new List<ViolenceRating>();
    
    public virtual ICollection<BookTags> BookTags { get; set; } = new List<BookTags>();
}
