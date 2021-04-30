using covidSim.Models;
using covidSim.Services;
using Microsoft.AspNetCore.Mvc;

namespace covidSim.Controllers
{
    [Route("api/person")]
    public class PersonController : Controller
    {
        [HttpPatch("{id}")]
        public IActionResult Patch([FromRoute] int id, [FromBody] Vec position)
        {
            var game = Game.Instance;
            var person = game.People.Find(p => p.Id == id);
            if (person == null)
                return NoContent();
            person.Position = position;
            return NoContent();
        }
    }
}