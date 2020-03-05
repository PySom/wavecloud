using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace WaveCloud.Models.ViewModels
{
    public class FileViewModel
    {
        [Required]
        public IFormFile File { get; set; }
    }
}
