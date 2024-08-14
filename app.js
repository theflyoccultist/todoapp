import express from 'express'

import {getTasks, 
        getTask, 
        createTask, 
        editTask, 
        deleteTask, 
        deleteAllTasks} from './database.js'

const app = express()

app.use(express.json())

app.get("/tasks", async (req, res) => {
    const tasks = await getTasks()
    res.send(tasks)
})

app.get("/tasks/:id", async (req, res) => {
    const id = req.params.id
    const task = await getTask(id)
    res.send(task)
})

app.post("/tasks", async(req, res) => {
    const { task, status } = req.body
    const tache = await createTask(task, status)
    res.status(201).send(tache)
})

app.put("/tasks/:id", async (req, res) => {
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
    }
});

app.delete("/tasks/:id", async (req, res) => {
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
    }
})

app.delete("/tasks", async (req, res) => {
    try {
        const deleteAll = await deleteAllTasks();

        if (deleteAll) {
            res.status(200).json({ message: 'All tasks deleted successfully' });
        } else {
            res.status(404).json({ message: 'No tasks to delete' });
        }
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
});


app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something Broke!')
})

app.listen(8000, () => {
    console.log('Server is running on port 8000')
})