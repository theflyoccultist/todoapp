import {getTasks, getTask, createTask, editTask, deleteTask} from '../models/taskModel.js';


export async function showAllTasks(req, res) {
    try {
        const userId = req.user.id
        const tasks = await getTasks(userId)
        res.status(200).json(tasks);
        } catch (error) {
            res.status(500).json({ message: "an error occured", error: error.message});
        }
}    

export async function showTask(req, res) {
    const id = req.params.id
    const task = await getTask(id)
    res.send(task)
    }

export async function newTask(req, res) {
const { task, status } = req.body;
const userId = req.user.id;
const tache = await createTask(task, status, userId)
res.status(201).send(tache);
}

export async function updateTask(req, res) {
    const userId = req.user.id;
    const id = parseInt(req.params.id, 10);
    const { task, status } = req.body;

    try {
        const edit = await editTask(id, task, status, userId);

        if (edit) {
            res.status(202).json({ message: 'Task updated successfully' })
        } else {
            res.status(404).json({ message: 'Task not found'});
        }
    } catch (error) {
            res.status(500).json({message: 'an error occured', error: error.message});
        }};


export async function removeTask(req, res) {
    const userId = req.user.id
    const id = parseInt(req.params.id, 10);

    try {
        const deleteOne = await deleteTask(id, userId);

        if (deleteOne) {
            res.status(200).json({ message: 'Task deleted successfully'});
        } else [
            res.status(404).json({ message: 'No task to delete' })
        ]
    } catch (error) {
        res.status(500).json({ message: 'An error occured', error: error.message })
    }
}