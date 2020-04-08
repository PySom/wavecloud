using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WaveCloud.Models
{
    public class Beat : IModel
    {
        public Beat()
        {
            IsVisible = true;
            DateAdded = DateTime.Now;
            Emotion = Emotion.None;
        }
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Content { get; set; }
        public string Image { get; set; }
        public double Amount { get; set; }
        public string Description { get; set; }
        public Emotion Emotion { get; set; }
        public DateTime DateAdded { get; set; }
        public DateTime DateModified { get; set; }
        public DateTime DateDeleted { get; set; }
        public bool IsVisible { get; set; }
        public ICollection<Rating> Ratings { get; set; }
        
        [ForeignKey("GenreId")]
        public Genre Genre { get; set; }
         public int GenreId { get; set; }

    }

    public enum Emotion : byte { None, Happy, Hipnotic, Calm, Sad}
    
}
