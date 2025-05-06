using BookRata.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BookRata.Controllers;

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
public IActionResult GetBooksWithJoinedRatings()
{
    var booksWithRatings = (from b in _context.Books

                            join bs in _context.BookSynopses on b.BookId equals bs.BookId into bsJoin
                            from bs in bsJoin.DefaultIfEmpty()

                            join lr in _context.LanguageRatings on b.BookId equals lr.BookId into lrJoin
                            from lr in lrJoin.DefaultIfEmpty()

                            join sr in _context.SexRatings on b.BookId equals sr.BookId into srJoin
                            from sr in srJoin.DefaultIfEmpty()

                            join vr in _context.ViolenceRatings on b.BookId equals vr.BookId into vrJoin
                            from vr in vrJoin.DefaultIfEmpty()

                            join hr in _context.HealthRatings on b.BookId equals hr.BookId into hrJoin
                            from hr in hrJoin.DefaultIfEmpty()

                            join rr in _context.ReligionRatings on b.BookId equals rr.BookId into rrJoin
                            from rr in rrJoin.DefaultIfEmpty()

                            join lgbt in _context.LGBTQRatings on b.BookId equals lgbt.BookId into lgbtJoin
                            from lgbt in lgbtJoin.DefaultIfEmpty()

                            select new BookWithRatingsDto
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

                                OverallSynopsis = bs.OverallSynopsis,

                                LanguageTier = lr.TierRating,
                                LanguageReasoning = lr.LanguageReasoning,

                                SexTier = sr.TierRating,
                                SexReasoning = sr.SexReasoning,

                                ViolenceTier = vr.TierRating,
                                ViolenceReasoning = vr.ViolenceReasoning,

                                HealthTier = hr.TierRating,
                                HealthReasoning = hr.HealthReasoning,

                                ReligionTier = rr.TierRating,
                                ReligionReasoning = rr.ReligionReasoning,

                                LGBTQTier = lgbt.TierRating,
                                LGBTQReasoning = lgbt.LGBTQReasoning
                            }).ToList();

    return Ok(booksWithRatings);
}



}