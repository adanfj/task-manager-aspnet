using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
public class TaskService
{
    private readonly AppDbContext _context;
    /// <summary>
    /// Initializes a new instance of the <see cref="TaskService"/> class with the specified database context.
    /// </summary>
    /// <param name="context">The database context to be used by the service.</param>
    public TaskService(AppDbContext context)
    {
        // Assign the provided context to the private field
        _context = context;
    }
    /// <summary>
    /// Creates a new task
    /// </summary>
    /// <param name="myTask">The task to create</param>
    /// <returns>The created task</returns>
    public MyTask CreateTask(MyTask myTask)
    {
        // Set default values
        myTask.CreatedAt = DateTime.UtcNow;

        // Add the task to the database
        _context.MyTasks.Add(myTask);

        // Save the changes
        _context.SaveChanges();

        // Return the created task
        return myTask;
    }
    /// <summary>
    /// Retrieves a list of all tasks
    /// </summary>
    /// <returns>A list of all tasks</returns>
    public IEnumerable<MyTask> GetAllTasks()
    {
        // Retrieve a list of all tasks from the database
        return _context.MyTasks.ToList();
    }
    /// <summary>
    /// Retrieves a task by its ID
    /// </summary>
    /// <param name="id">The ID of the task to retrieve</param>
    /// <returns>The task if found, null otherwise</returns>
    public MyTask GetTaskById(int id)
    {
        // Attempt to find the task by ID
        return _context.MyTasks.Find(id);
    }

    /// <summary>
    /// Updates an existing task
    /// </summary>
    /// <param name="id">The ID of the task to update</param>
    /// <param name="myTask">The updated task information</param>
    /// <returns>true if the task was found and updated, false otherwise</returns>
    public bool UpdateTask(int id, MyTask myTask)
    {
        // Find the task to update
        var existingTask = _context.MyTasks.Find(id);
        if (existingTask == null)
        {
            return false; // Task not found
        }

        // Update the task properties
        existingTask.Title = myTask.Title;
        existingTask.Description = myTask.Description;
        existingTask.DueDate = myTask.DueDate;
        existingTask.IsCompleted = myTask.IsCompleted;
        existingTask.UpdatedAt = DateTime.UtcNow;

        // Save the changes to the database
        _context.Entry(existingTask).State = EntityState.Modified;
        _context.SaveChanges();

        return true;
    }

    /// <summary>
    /// Deletes a task by ID
    /// </summary>
    /// <param name="id">The ID of the task to delete</param>
    /// <returns>true if the task was found and deleted, false otherwise</returns>
    public bool DeleteTask(int id)
    {
        // Find the task to delete
        var myTask = _context.MyTasks.Find(id);
        if (myTask == null)
        {
            return false; // Task not found
        }

        // Remove the task from the database
        _context.MyTasks.Remove(myTask);
        _context.SaveChanges();
        return true;
    }
}