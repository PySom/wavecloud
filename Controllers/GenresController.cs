using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WaveCloud.Models;
using WaveCloud.Repository.Generics;

namespace WaveCloud.Controllers
{
    [Route("api/[controller]")]
    public class GenresController : ControllerBase
    {
        private readonly IModelManager<Genre> _repo;
        private readonly IMapper _mapper;
        public GenresController(IModelManager<Genre> repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet]
        public async ValueTask<IActionResult> Get()
        {
            ICollection<Genre> options = await _repo
                                                .Item()
                                                .ToListAsync();
            return Ok(options);

        }

        [HttpGet("{id:int}")]
        public async ValueTask<IActionResult> Get(int id)
        {
            Genre model = await _repo
                                .Item()
                                .Where(c => c.Id == id)
                                .Include(g => g.Beats)
                                .FirstOrDefaultAsync();
            if (model != null)
            {
                return Ok(model);
            }
            return NotFound();
        }

        [HttpPost]
        public async ValueTask<IActionResult> Post([FromBody] Genre model)
        {
            if (ModelState.IsValid)
            {
                (bool succeeded, Genre genre, string error) = await _repo.Add(model);
                if (succeeded) return Ok(genre);
                return BadRequest(new { Message = error });
            }
            return BadRequest(new { Errors = ModelState.Values.SelectMany(e => e.Errors).ToList() });
        }


        [HttpPut]
        public async ValueTask<IActionResult> Put([FromBody] Genre model)
        {
            if (ModelState.IsValid)
            {
                (bool succeeded, Genre genre, string error) = await _repo.Update(model);
                if (succeeded) return Ok(genre);
                return BadRequest(new { Message = error });
            }
            return BadRequest(new { Errors = ModelState.Values.SelectMany(e => e.Errors).ToList() });
        }

        [HttpDelete("{id}")]
        public async ValueTask<IActionResult> Delete(int id)
        {
            Genre option = new Genre { Id = id };
            string message;
            try
            {
                (bool succeeded, string error) = await _repo.Delete(option);
                message = error;
                if (succeeded) return NoContent();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                message = ex.Message;
            }
            return NotFound(new { Message = message });
        }

        //private bool IsVisibleQuery(Beat beat) => beat.IsVisible;
    }
}
