using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using WaveCloud.Repository.Generics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WaveCloud.Models;

namespace WaveCloud.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BeatsController : ControllerBase
    {
        private readonly IModelManager<Beat> _repo;
        private readonly IMapper _mapper;
        public BeatsController(IModelManager<Beat> repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet]
        public async ValueTask<IActionResult> Get()
        {
            ICollection<Beat> options = await _repo
                                                .Item()
                                                .ToListAsync();
            return Ok(options);

        }

        [HttpGet("{id:int}")]
        public async ValueTask<IActionResult> Get(int id)
        {
            Beat model = await _repo
                                .Item()
                                .Where(c => c.Id == id)
                                .FirstOrDefaultAsync();
            if (model != null)
            {
                return Ok(model);
            }
            return NotFound();
        }

        [HttpPost]
        public async ValueTask<IActionResult> Post([FromBody] Beat model)
        {
            if (ModelState.IsValid)
            {
                (bool succeeded, Beat beat, string error) = await _repo.Add(model);
                if (succeeded) return Ok(beat);
                return BadRequest(new { Message = error });
            }
            return BadRequest(new { Errors = ModelState.Values.SelectMany(e => e.Errors).ToList() });
        }


        [HttpPut]
        public async ValueTask<IActionResult> Put([FromBody] Beat model)
        {
            if (ModelState.IsValid)
            {
                (bool succeeded, Beat beat, string error) = await _repo.Update(model);
                if (succeeded) return Ok(beat);
                return BadRequest(new { Message = error });
            }
            return BadRequest(new { Errors = ModelState.Values.SelectMany(e => e.Errors).ToList() });
        }

        [HttpDelete("{id}")]
        public async ValueTask<IActionResult> Delete(int id)
        {
            Beat option = new Beat { Id = id };
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

        private bool IsVisibleQuery(Beat beat) => beat.IsVisible;
    }
}