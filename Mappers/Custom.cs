﻿using AutoMapper;
using WaveCloud.Models;
using WaveCloud.Models.ViewModels;

namespace WaveCloud.Mappers
{
    public class Custom : Profile
    {
        public Custom()
        {
            CreateMap<ApplicationUser, RegisterViewModel>()
                .ReverseMap();
            CreateMap<ApplicationUser, UserViewModel>()
                .ReverseMap();
            CreateMap<Beat, BeatViewModel>()
                .ReverseMap();
        }
    }
}
