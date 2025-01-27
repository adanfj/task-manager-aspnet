import { appFetchInstance } from "../lib/fetch-instance";
import { useState } from "react";

const Tasks: React.FC<{ tasks: Task[] }> = ({ tasks }) => {
    const [taskToEdit, setTaskToEdit] = useState<number | undefined>(-1);
    const [tasksDOM, setTasks] = useState(tasks)
    return (
        <div className="min-w-[600px]">
            <h1>Tasks</h1>
            {tasksDOM.map((task, index) => (
                <div key={task.id} className="flex gap-4 border-b border-gray-500 py-2">
                    {
                        taskToEdit === task.id ? (
                            <form action="" encType="multipart/form-data" method="PUT" className="flex flex-col gap-1 shadow-lg p-4 w-full" onSubmit={async (e) => {

                                e.preventDefault();
                                console.log("Is completed", (e.target as HTMLFormElement).isCompleted)
                                const editedTask: Task = {
                                    id: task.id,
                                    title: (e.target as HTMLFormElement).title.value,
                                    description: (e.target as HTMLFormElement).description.value,
                                    dueDate: (e.target as HTMLFormElement).dueDate.value,
                                    isCompleted: (e.target as HTMLFormElement).isCompleted.checked
                                }
                                if (!(await appFetchInstance().put(``, editedTask))) {
                                    console.error("Failed to update task");
                                }
                                tasks[index] = editedTask;
                                setTasks([...tasks]);
                                setTaskToEdit(-1);
                            }}>
                                <label htmlFor="title">Title</label>
                                <input type="text" id="title" name="title" required defaultValue={task.title} />
                                <label htmlFor="description">Description</label>
                                <input type="text" id="description" name="description" required minLength={10} defaultValue={task.description} />
                                <label htmlFor="dueDate">Due Date</label>
                                <input type="datetime-local" id="dueDate" name="dueDate" defaultValue={task.dueDate} />
                                <label>Completed <input type="checkbox" id="isCompleted" name="isCompleted" defaultChecked={task.isCompleted} /></label>
                                <button type="submit" className="w-fit px-2 rounded-sm">Update</button>

                            </form>
                        ) : (
                            <p className={`${task.isCompleted ? "line-through opacity-50" : ""} space-x-2`}>
                                <span>{task.title}</span>
                                <span>{task.description}</span>
                                <span>{task.dueDate}</span>
                            </p>
                        )
                    }
                    <button onClick={() => setTaskToEdit(task.id)} disabled={task.isCompleted} className="ml-auto w-fit disabled:bg-green-900/75 bg-green-500 px-2 rounded-sm h-fit">Edit</button>
                    <button onClick={async () => {
                        if (window.confirm("Are you sure you want to delete this task?")) {
                            await appFetchInstance().delete(``, task)
                            setTasks(tasksDOM.filter((t) => t.id !== task.id));
                        }
                    }} className="w-fit bg-red-500 px-2 rounded-sm h-fit">Delete</button>
                </div>
            ))}
            <div className="mt-8">
                <h1>Create a task</h1>
                <form action="" method="POST" className="flex flex-col gap-1 shadow-lg p-4" onSubmit={async (e) => {
                    e.preventDefault();
                    setTasks([...tasksDOM, await appFetchInstance().post(``, {
                        title: (e.target as HTMLFormElement).title.value,
                        description: (e.target as HTMLFormElement).description.value,
                        dueDate: (e.target as HTMLFormElement).dueDate.value,
                        isCompleted: false
                    })])
                }}>
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" name="title" required />
                    <label htmlFor="description">Description</label>
                    <input type="text" id="description" name="description" required minLength={10} />
                    <label htmlFor="dueDate">Due Date</label>
                    <input type="datetime-local" id="dueDate" name="dueDate" />
                    <button type="submit" className="w-fit px-2 rounded-sm">Create</button>
                </form>
            </div>
        </div>
    )
}

export default Tasks;