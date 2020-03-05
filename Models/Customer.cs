using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WaveCloud.Enums;

namespace WaveCloud.Models
{
    public class Customer : IModel
    {
        public Customer()
        {
            IsVisible = true;
            DateAdded = DateTime.Now;
        }
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [ForeignKey("UserId")]
        public ApplicationUser User { get; set; }
        public int UserId { get; set; }

        [ForeignKey("BestId")]
        public Beat Beat { get; set; }
        public int BeatId { get; set; }

        public PaymentType PaymentType { get; set; }

        public DateTime DateAdded { get; set; }
        public DateTime DateModified { get; set; }
        public DateTime DateDeleted { get; set; }

        public bool IsVisible { get; set; }
    }

}

namespace WaveCloud.Enums
{
    public enum PaymentType { Card, Cash }
}