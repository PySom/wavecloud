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
        public async ValueTask<IActionResult> Get([FromQuery]Emotion emotion = Emotion.None, int genreId = 0)
        {
            if(emotion == Emotion.None){
                ICollection<Beat> options = await _repo
                                                .Item()
                                                .ToListAsync();
                return Ok(options);
            }
            else{
                if(genreId == 0){
                    ICollection<Beat> options = await _repo
                                                .Item()
                                                .Where(e => e.Emotion == emotion)
                                                .ToListAsync();
                    return Ok(options);
                }
                else{
                    ICollection<Beat> options = await _repo
                                                .Item()
                                                .Where(e => e.Emotion == emotion && e.GenreId == genreId)
                                                .ToListAsync();
                    return Ok(options);
                }
                
            }
        }
         

        [HttpGet("{id:int}")]
        public async ValueTask<IActionResult> Get(int id, bool parentId = false)
        {
            if (parentId){
                var data = await _repo
                                .Item()
                                .Where(c => c.GenreId == id)
                                .Include(c => c.Ratings)
                                .ToListAsync();
                return Ok(data);
            }
            Beat model = await _repo
                                .Item()
                                .Where(c => c.Id == id)
                                .Include(c => c.Ratings)
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
        public async ValueTask<IActionResult> Delete(int id, int genreId)
        {
            Beat option = new Beat { Id = id, GenreId = genreId};
            string message;
            try
            {
                (bool succeeded, string error) = await _repo.Delete(option);
                message = error;
                if (succeeded) return NoContent();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                message = ex.Message + ex.InnerException.Message;
            }
            return NotFound(new { Message = message});
        }

        private bool IsVisibleQuery(Beat beat) => beat.IsVisible;
    }
}