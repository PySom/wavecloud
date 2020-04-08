using System;
using WaveCloud.Models;

public class BeatViewModel
    {
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
        public double Rating { get; set; }
         public int GenreId { get; set; }

    }
