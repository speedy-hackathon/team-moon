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
            if (position.X < 0 || position.Y < 0 || position.X > Game.FieldWidth || position.Y > Game.FieldHeight)
                return UnprocessableEntity();
            if (person == null)
                return NotFound();

            person.Position = position;
            person.LeftHome();
            return NoContent();
        }
    }
}