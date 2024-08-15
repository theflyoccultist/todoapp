import {getTasks, 
    getTask, 
    createTask, 
    editTask, 
    deleteTask, 
    deleteAllTasks} from '../models/taskModel.js';


export async function showAllTasks(req, res) {
const tasks = await getTasks()
res.send(tasks)
}

export async function showTask(req, res) {
const id = req.params.id
const task = await getTask(id)
res.send(task)
}

export async function newTask(req, res) {
const { task, status } = req.body
const tache = await createTask(task, status)
res.status(201).send(tache)
}

export async function updateTask(req, res) {
const id = parseInt(req.params.id, 10);
const { task, status } = req.body;

try {
    const edit = await editTask(id, task, status);

    if (edit) {
        res.status(202).json({ message: 'Task updated successfully' })
    } else {
        res.status(404).json({ message: 'Task not found'});
    }
} catch (error) {
    res.status(500).json({message: 'an error occured', error: error.message});
}};

export async function removeTask(req, res) {
const id = parseInt(req.params.id, 10);

try {
    const deleteOne = await deleteTask(id);

    if (deleteOne) {
        res.status(200).json({ message: 'Task deleted successfully'});
    } else [
        res.status(404).json({ message: 'No task to delete' })
    ]
} catch (error) {
    res.status(500).json({ message: 'An error occured', error: error.message })
}}

export async function removeAllTasks(req, res) {
try {
    const deleteAll = await deleteAllTasks();

    if (deleteAll) {
        res.status(200).json({ message: 'All tasks deleted successfully' });
    } else {
        res.status(404).json({ message: 'No tasks to delete' });
    }
} catch (error) {
    res.status(500).json({ message: 'An error occurred', error: error.message });
}};