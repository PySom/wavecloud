﻿using AutoMapper;

namespace WaveCloud.Repository.Extension
{
    public static class GenericExtension
    {
        public static TDestination Convert<TSource, TDestination>(this TSource model, IMapper _mapper)
        {
            return _mapper.Map<TSource, TDestination>(model);
        }

    }
}
