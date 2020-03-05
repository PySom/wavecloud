﻿using System.ComponentModel.DataAnnotations;

namespace WaveCloud.Models.ViewModels
{
    public class RegisterViewModel
    {
        public string Id { get; set; }
        [Required]
        public string SurName { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        [Phone]
        public string PhoneNumber { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        public string Image { get; set; }
        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} and at max {1} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Compare(nameof(Password), ErrorMessage = "The password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }
    }
}
