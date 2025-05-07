using System;
using System.Collections.Generic;

namespace BookRata.Models;

public partial class User
{
    public int UserId { get; set; }

    public string? Username { get; set; }

    public string? Email { get; set; }

    public string? PasswordHash { get; set; }

    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    public int? RoleId { get; set; }

    public DateTime? DateCreated { get; set; }

    public DateTime? LastLogin { get; set; }

    public virtual Role? Role { get; set; }

}
