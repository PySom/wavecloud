using System.ComponentModel.DataAnnotations;

namespace WaveCloud.Models.ViewModels
{
    public class FileEditViewModel : FileViewModel
    {
        [Required]
        public string OldImage { get; set; }
    }
}
