using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;
using WaveCloud.Models;
using WaveCloud.Repository.Generics;

namespace WaveCloud.Controllers
{
    [Route("api/[controller]")]
    public class RatingsController : ControllerBase
    {
        private readonly IModelManager<Rating> _repo;
        private readonly IMapper _mapper;
        public RatingsController(IModelManager<Rating> repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        
        [HttpPost]
        public async ValueTask<IActionResult> Post([FromBody] Rating model)
        {
            if (ModelState.IsValid)
            {
                (bool succeeded, Rating rating, string error) = await _repo.Add(model);
                if (succeeded) return Ok(rating);
                return BadRequest(new { Message = error });
            }
            return BadRequest(new { Errors = ModelState.Values.SelectMany(e => e.Errors).ToList() });
        }

        [HttpPut]
        public async ValueTask<IActionResult> Put([FromBody] Rating model)
        {
            if (ModelState.IsValid)
            {
                (bool succeeded, Rating rating, string error) = await _repo.Update(model);
                if (succeeded) return Ok(rating);
                return BadRequest(new { Message = error });
            }
            return BadRequest(new { Errors = ModelState.Values.SelectMany(e => e.Errors).ToList() });
        }

        
    }
}
