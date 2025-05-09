using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Scaffolding.Internal;

namespace BookRata.Models;

public partial class BookRataDBContext : DbContext
{

    public BookRataDBContext(DbContextOptions<BookRataDBContext> options) : base(options)
    {
    }

    public virtual DbSet<Book> Books { get; set; }

    public virtual DbSet<BookSynopsis> BookSynopses { get; set; }

    public virtual DbSet<BookWordCount> BookWordCounts { get; set; }

    public virtual DbSet<HealthRating> HealthRatings { get; set; }

    public virtual DbSet<LGBTQRating> LGBTQRatings { get; set; }

    public virtual DbSet<LanguageRating> LanguageRatings { get; set; }

    public virtual DbSet<ReligionRating> ReligionRatings { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<SexRating> SexRatings { get; set; }

    public virtual DbSet<SwearWord> SwearWords { get; set; }


    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<ViolenceRating> ViolenceRatings { get; set; }

    public virtual DbSet<BookTags> BookTags { get; set; }
    
    public virtual DbSet<Tags> Tags { get; set; }
    
    
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
        {
            optionsBuilder.UseMySql(
                "BookRataConnection",
                ServerVersion.AutoDetect("BookRataConnection"));
        }
    }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .UseCollation("utf8mb4_0900_ai_ci")
            .HasCharSet("utf8mb4");

        modelBuilder.Entity<Book>(entity =>
        {
            entity.HasKey(e => e.BookId).HasName("PRIMARY");

            entity.Property(e => e.Author).HasMaxLength(255);
            entity.Property(e => e.BookSummary).HasColumnType("text");
            entity.Property(e => e.ISBN).HasMaxLength(20);
            entity.Property(e => e.OverallTier).HasMaxLength(10);
            entity.Property(e => e.TextUrl).HasMaxLength(255);
            entity.Property(e => e.Title).HasMaxLength(255);
        });

        modelBuilder.Entity<BookSynopsis>(entity =>
        {
            entity.HasKey(e => e.SynopsisId).HasName("PRIMARY");

            entity.ToTable("BookSynopsis");

            entity.HasIndex(e => e.BookId, "BookId");

            entity.Property(e => e.OverallSynopsis).HasColumnType("text");

            entity.HasOne(d => d.Book).WithMany(p => p.BookSynopses)
                .HasForeignKey(d => d.BookId)
                .HasConstraintName("booksynopsis_ibfk_1");
        });

        modelBuilder.Entity<BookWordCount>(entity =>
        {
            entity.HasKey(e => e.CountId).HasName("PRIMARY");

            entity.HasIndex(e => new { e.BookId, e.WordId }, "BookId").IsUnique();

            entity.HasIndex(e => e.WordId, "WordId");

            entity.Property(e => e.Count).HasDefaultValueSql("'0'");

            entity.HasOne(d => d.Book).WithMany(p => p.BookWordCounts)
                .HasForeignKey(d => d.BookId)
                .HasConstraintName("bookwordcounts_ibfk_1");

            entity.HasOne(d => d.Word).WithMany(p => p.BookWordCounts)
                .HasForeignKey(d => d.WordId)
                .HasConstraintName("bookwordcounts_ibfk_2");
        });

        modelBuilder.Entity<HealthRating>(entity =>
        {
            entity.HasKey(e => e.HealthRatingId).HasName("PRIMARY");

            entity.HasIndex(e => e.BookId, "BookId");

            entity.Property(e => e.HealthReasoning).HasColumnType("text");
            entity.Property(e => e.TierRating).HasMaxLength(10);

            entity.HasOne(d => d.Book).WithMany(p => p.HealthRatings)
                .HasForeignKey(d => d.BookId)
                .HasConstraintName("healthratings_ibfk_1");
        });

        modelBuilder.Entity<LGBTQRating>(entity =>
        {
            entity.HasKey(e => e.LGBTQRatingId).HasName("PRIMARY");

            entity.HasIndex(e => e.BookId, "BookId");

            entity.Property(e => e.LGBTQReasoning).HasColumnType("text");
            entity.Property(e => e.TierRating).HasMaxLength(10);

            entity.HasOne(d => d.Book).WithMany(p => p.LGBTQRatings)
                .HasForeignKey(d => d.BookId)
                .HasConstraintName("lgbtqratings_ibfk_1");
        });

        modelBuilder.Entity<LanguageRating>(entity =>
        {
            entity.HasKey(e => e.LanguageRatingId).HasName("PRIMARY");

            entity.HasIndex(e => e.BookId, "BookId");

            entity.Property(e => e.LanguageReasoning).HasColumnType("text");
            entity.Property(e => e.TierRating).HasMaxLength(10);

            entity.HasOne(d => d.Book).WithMany(p => p.LanguageRatings)
                .HasForeignKey(d => d.BookId)
                .HasConstraintName("languageratings_ibfk_1");
        });

        modelBuilder.Entity<ReligionRating>(entity =>
        {
            entity.HasKey(e => e.ReligionRatingId).HasName("PRIMARY");

            entity.HasIndex(e => e.BookId, "BookId");

            entity.Property(e => e.ReligionReasoning).HasColumnType("text");
            entity.Property(e => e.TierRating).HasMaxLength(10);

            entity.HasOne(d => d.Book).WithMany(p => p.ReligionRatings)
                .HasForeignKey(d => d.BookId)
                .HasConstraintName("religionratings_ibfk_1");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.RoleId).HasName("PRIMARY");

            entity.Property(e => e.Rolename).HasMaxLength(50);
        });

        modelBuilder.Entity<SexRating>(entity =>
        {
            entity.HasKey(e => e.SexRatingId).HasName("PRIMARY");

            entity.HasIndex(e => e.BookId, "BookId");

            entity.Property(e => e.SexReasoning).HasColumnType("text");
            entity.Property(e => e.TierRating).HasMaxLength(10);

            entity.HasOne(d => d.Book).WithMany(p => p.SexRatings)
                .HasForeignKey(d => d.BookId)
                .HasConstraintName("sexratings_ibfk_1");
        });

        modelBuilder.Entity<SwearWord>(entity =>
        {
            entity.HasKey(e => e.WordId).HasName("PRIMARY");

            entity.HasIndex(e => e.Word, "Word").IsUnique();

            entity.Property(e => e.Word).HasMaxLength(50);
        });


        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PRIMARY");

            entity.HasIndex(e => e.RoleId, "RoleId");

            entity.Property(e => e.DateCreated).HasColumnType("datetime");
            entity.Property(e => e.Email).HasMaxLength(100);
            entity.Property(e => e.FirstName).HasMaxLength(50);
            entity.Property(e => e.LastLogin).HasColumnType("datetime");
            entity.Property(e => e.LastName).HasMaxLength(50);
            entity.Property(e => e.PasswordHash).HasMaxLength(255);
            entity.Property(e => e.Username).HasMaxLength(50);

            entity.HasOne(d => d.Role).WithMany(p => p.Users)
                .HasForeignKey(d => d.RoleId)
                .HasConstraintName("users_ibfk_1");
        });

        modelBuilder.Entity<ViolenceRating>(entity =>
        {
            entity.HasKey(e => e.ViolenceRatingId).HasName("PRIMARY");

            entity.HasIndex(e => e.BookId, "BookId");

            entity.Property(e => e.TierRating).HasMaxLength(10);
            entity.Property(e => e.ViolenceReasoning).HasColumnType("text");

            entity.HasOne(d => d.Book).WithMany(p => p.ViolenceRatings)
                .HasForeignKey(d => d.BookId)
                .HasConstraintName("violenceratings_ibfk_1");
        });

        modelBuilder.Entity<BookTags>(entity =>
        {
            entity.HasKey(e => new { e.BookId, e.TagId }).HasName("PRIMARY");

            entity.HasIndex(e => e.BookId, "BookId");
            entity.HasIndex(e => e.TagId, "TagId");

            entity.HasOne(d => d.Book)
                .WithMany(p => p.BookTags)
                .HasForeignKey(d => d.BookId)
                .HasConstraintName("booktags_ibfk_1");

            entity.HasOne(d => d.Tag)
                .WithMany()
                .HasForeignKey(d => d.TagId)
                .HasConstraintName("booktags_ibfk_2");
        });

        modelBuilder.Entity<Tags>(entity =>
        {
            entity.HasKey(e => e.TagId).HasName("PRIMARY");

            entity.Property(e => e.TagName).HasMaxLength(50);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
