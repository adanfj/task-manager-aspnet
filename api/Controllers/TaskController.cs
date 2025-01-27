using System.Net.Mime;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
[Route("api/[controller]")]
[ApiController]
public class TaskController : ControllerBase
{
    private readonly TaskService _taskService;
    public TaskController(TaskService taskService)
    {
        _taskService = taskService;
    }

    [HttpGet]
    [Authorize]
    public IEnumerable<MyTask> GetTasks()
    {
        return _taskService.GetAllTasks();
    }

    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [Authorize]
    // [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public ActionResult<MyTask> GetTask(int id)
    {
        var task = _taskService.GetTaskById(id);
        return task == null ? StatusCode(404) : task;
    }

    [HttpPost]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    // [Authorize]
    public ActionResult<MyTask> CreateTask([FromBody] MyTask task)
    {
        if(!ModelState.IsValid) return BadRequest(ModelState);
        try
        {
            return StatusCode(201, _taskService.CreateTask(task));
        }
        catch (System.Exception)
        {
            System.Console.WriteLine("Error");
            return BadRequest();
        }
    }

    [HttpPut("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [Authorize]
    public ActionResult<bool> UpdateTask(int id, [FromBody] MyTask task)
    {
        if(!ModelState.IsValid) return BadRequest(ModelState);
        try
        {
            // if (task.Id != null && id != task.Id) return NotFound();
            var result = _taskService.UpdateTask(id, task);
            if (!result) return NotFound();
            return StatusCode(200, result);
        }
        catch (System.Exception e)
        {
            System.Console.WriteLine(e.Message);
            return BadRequest();
        }
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [Authorize]
    public IActionResult DeleteTask(int id)
    {

        try
        {
            if ((_taskService.GetTaskById(id)) == null)
            {
                return NotFound();
            }
            _taskService.DeleteTask(id);
            return NoContent();
        }
        catch (System.Exception)
        {
            System.Console.WriteLine("Error");
            return BadRequest();
        }
    }
}