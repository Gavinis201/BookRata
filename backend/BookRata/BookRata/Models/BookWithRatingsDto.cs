namespace BookRata.Models
{
    public class BookWithRatingsDto
    {
        public int BookId { get; set; }
        public string? Title { get; set; }
        public string? Author { get; set; }
        public string? ISBN { get; set; }
        public string? TextUrl { get; set; }
        public string? BookSummary { get; set; }
        public string? OverallTier { get; set; }
        public DateTime? ReviewDate { get; set; }

        public string? OverallSynopsis { get; set; }

        public string? LanguageTier { get; set; }
        public string? LanguageReasoning { get; set; }

        public string? SexTier { get; set; }
        public string? SexReasoning { get; set; }

        public string? ViolenceTier { get; set; }
        public string? ViolenceReasoning { get; set; }
        public string? HealthTier { get; set; }
        public string? HealthReasoning { get; set; }

        public string? ReligionTier { get; set; }
        public string? ReligionReasoning { get; set; }

        public string? LGBTQTier { get; set; }
        public string? LGBTQReasoning { get; set; }
        public DateOnly? PublishDate { get; set; }
    }
}