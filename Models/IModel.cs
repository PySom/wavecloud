using System;

namespace WaveCloud.Models
{
    public interface IModel
    {
        int Id { get; set; }
        bool IsVisible { get; set; }
        DateTime DateAdded { get; set; }
        DateTime DateModified { get; set; }
        DateTime DateDeleted { get; set; }
    }
}