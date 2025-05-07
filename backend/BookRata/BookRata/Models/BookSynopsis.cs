using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace BookRata.Models;

public partial class BookSynopsis
{
    public int SynopsisId { get; set; }

    public int? BookId { get; set; }

    public string? OverallSynopsis { get; set; }

    [JsonIgnore]
    public virtual Book? Book { get; set; }

}
