let taskisVisible = false;
const taskList = document.getElementById('task-list');

async function fetchTasks() {

    const toggleButton = document.querySelector('#get-tasks');
    const deleteAllTaskButton = document.querySelector('#delete_all_item')

    if (taskisVisible) {
        taskList.innerHTML = '';
        toggleButton.textContent = 'Show Tasks';
    } else {
        try {
            const response = await fetch('/api/tasks');
            const tasks = await response.json();
            
            taskList.innerHTML = '';
            tasks.forEach(task => {
                const li = document.createElement('li');
                li.id = `task-${task.id}`;

                const checkbox = createCheckbox(task.status, () => updateTaskStatus(task.id, checkbox.checked, task.task));
                const deleteTaskButton = createButton('Delete', () => deleteTask(task.id));
                
                li.appendChild(checkbox);
                li.appendChild(document.createTextNode(` ${task.task} `));
                li.appendChild(deleteTaskButton)
                taskList.appendChild(li);
            });
            toggleButton.textContent = 'Hide Tasks';
        } catch(error) {
            console.error('Error fetching tasks:', error);
        }
    }
    taskisVisible = !taskisVisible;
}

function createCheckbox(checked, onChange) {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = checked;
    checkbox.onchange = onChange;
    return checkbox;
}

function createButton(text, onClick) {
    const button = document.createElement('button');
    button.textContent = text;
    button.addEventListener('click', onClick);
    return button;
}

async function updateTaskStatus(taskId, status, task) {
    try {
        const response = await fetch(`/api/tasks/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ task,status })
        });
        if (!response.ok) {
            throw new Error('Failed to update task status');
        }
        console.log('Task status updated successfully');
    } catch (error) {
        console.error('Error updating task status', error);
    }
}

async function addTask(status, task) {
    const addTaskButton = document.querySelector('#add_item');
    const tasksContainer = document.querySelector('#list-container')
    const taskisVisible = tasksContainer && tasksContainer.style.display !== 'none';

    if (taskisVisible && addTaskButton) {
        const taskForm = document.createElement('form');
        taskForm.innerHTML = `
        <input type="text" id="task-input" value="${task || ''}" placeholder="Enter task" required>
        <input type="checkbox" id="status-input" ${status ? 'checked' : ''}>
        <button type="submit">Add Task</button>
    `;

        tasksContainer.appendChild(taskForm);

        taskForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const taskValue = document.querySelector('#task-input').value;
            const statusValue = document.querySelector('#status-input').checked;

            const success = await taskRequest(statusValue, taskValue);

            if (success) {
                const li = document.createElement('li');                
                li.innerHTML = `
                    <input type="checkbox" ${statusValue ? 'checked' : ''}>
                    ${taskValue}
                    <button id="delete-item" onclick="deleteTask(${li.id})">Delete</button>
                `;

                // Append the new task to the tasks container
                taskList.appendChild(li);
                taskForm.reset();
                console.log('Task added and displayed successfully.');
            }
        });
    } else {
        console.log("you need to show tasks before adding.")
    }
}


async function taskRequest(status, task) {
    try {
        const response = await fetch(`/api/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ task, status })
        });
        if (!response.ok) {
            throw new Error('Failed to add task');
        }
        console.log('Task status added successfully');
        return true;
    } catch (error) {
        console.error('Error adding task', error);
        return false;
    }
}


function deleteTask(taskId) {
    deleteRequest(taskId).then(() => {
        const taskElement = document.getElementById(`task-${taskId}`);
        if (taskElement) {
            taskElement.remove();
        }
    }).catch((error) => {
        console.error('error during task deletion:', error)
    });
}

async function deleteRequest(taskId) {
    try {
       const response = await fetch(`/api/tasks/${taskId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
       });
       if (!response.ok) {
        throw new Error('Failed to delete task')
       } 
       console.log("task deleted successfully.")
    } catch (error) {
        console.error('Error deleting task', error);
    }
}