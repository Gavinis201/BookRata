using BookRata.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BookRata.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly BookRataDBContext _context;

        public BookController(BookRataDBContext temp)
        {
            _context = temp;
        }

        [HttpGet("JoinedRatings")]
        public IActionResult GetBooksWithJoinedRatings([FromQuery] string? title, [FromQuery] string? author, [FromQuery] List<string>? tags)
        {
            var booksQuery = _context.Books
                .Include(b => b.BookSynopses)
                .Include(b => b.LanguageRatings)
                .Include(b => b.SexRatings)
                .Include(b => b.ViolenceRatings)
                .Include(b => b.HealthRatings)
                .Include(b => b.ReligionRatings)
                .Include(b => b.LGBTQRatings)
                .Include(b => b.BookTags)
                    .ThenInclude(bt => bt.Tag)
                .AsQueryable();

            if (!string.IsNullOrEmpty(title))
            {
                booksQuery = booksQuery.Where(b => b.Title.Contains(title));
            }

            if (!string.IsNullOrEmpty(author))
            {
                booksQuery = booksQuery.Where(b => b.Author != null && b.Author.Contains(author));
            }

            if (tags != null && tags.Any())
            {
                var loweredTags = tags.Select(t => t.ToLower()).ToList();
                booksQuery = booksQuery.Where(b => b.BookTags.Any(bt => loweredTags.Contains(bt.Tag.TagName.ToLower())));
            }

            var booksWithRatings = booksQuery.Select(b => new BookWithRatingsDto
            {
                BookId = b.BookId,
                Title = b.Title,
                Author = b.Author,
                ISBN = b.ISBN,
                TextUrl = b.TextUrl,
                BookSummary = b.BookSummary,
                OverallTier = b.OverallTier,
                ReviewDate = b.ReviewDate,
                PublishDate = b.PublishDate,

                OverallSynopsis = b.BookSynopses.FirstOrDefault().OverallSynopsis,

                LanguageTier = b.LanguageRatings.FirstOrDefault().TierRating,
                LanguageReasoning = b.LanguageRatings.FirstOrDefault().LanguageReasoning,

                SexTier = b.SexRatings.FirstOrDefault().TierRating,
                SexReasoning = b.SexRatings.FirstOrDefault().SexReasoning,

                ViolenceTier = b.ViolenceRatings.FirstOrDefault().TierRating,
                ViolenceReasoning = b.ViolenceRatings.FirstOrDefault().ViolenceReasoning,

                HealthTier = b.HealthRatings.FirstOrDefault().TierRating,
                HealthReasoning = b.HealthRatings.FirstOrDefault().HealthReasoning,

                ReligionTier = b.ReligionRatings.FirstOrDefault().TierRating,
                ReligionReasoning = b.ReligionRatings.FirstOrDefault().ReligionReasoning,

                LGBTQTier = b.LGBTQRatings.FirstOrDefault().TierRating,
                LGBTQReasoning = b.LGBTQRatings.FirstOrDefault().LGBTQReasoning,

                TagName = b.BookTags.Select(bt => bt.Tag.TagName).ToList()
            }).ToList();

            return Ok(booksWithRatings);
        }

        [HttpGet("Tags")]
        public IActionResult GetTags()
        {
            var tags = _context.Tags
                .Select(t => new { t.TagId, t.TagName })
                .ToList();
            return Ok(tags);
        }

        [HttpGet("BookTitles")]
        public IActionResult GetBookTitles()
        {
            var titles = _context.Books;
            return Ok(titles);
        }

        [HttpGet("BookAuthors")]
        public IActionResult GetBookAuthors()
        {
            var distinctAuthors = _context.Books
                .Select(b => b.Author)
                .Distinct()
                .ToList();
            return Ok(distinctAuthors);
        }
    }
}
