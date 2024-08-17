let taskisVisible = false;
const taskList = document.getElementById('task-list');

async function fetchTasks() {

    const toggleButton = document.querySelector('#get-tasks');
    // const deleteAllTaskButton = document.querySelector('#delete_all_item')

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
                const editTaskButton = createButton('Edit', () => showEditTaskForm(task.id, task.task, task.status));
                const deleteTaskButton = createButton('Delete', () => deleteTask(task.id));
                
                li.appendChild(checkbox);
                li.appendChild(document.createTextNode(` ${task.task} `));
                li.appendChild(editTaskButton);
                li.appendChild(deleteTaskButton);
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

async function addTask() {
    const existingForm = document.querySelector('#taskForm');
    if (existingForm) {
        console.log("A task form is already open.");
        return;
    }
    
    const addTaskButton = document.querySelector('#add_item');
    
    if (taskisVisible && addTaskButton) {
        const taskField = document.createElement('form');
        taskField.id = 'taskForm';  // Set an ID to identify the form
        taskField.innerHTML = `
            <input type="text" id="newTask" placeholder="Task name" required>
            <label>
                <input type="checkbox" id="newTaskStatus">
                Completed
            </label>
            <button type="submit">Add Task</button>
        `;

        taskField.onsubmit = async (e) => {
            e.preventDefault();
            const newTaskName = document.querySelector('#newTask').value;
            const newTaskStatus = document.querySelector('#newTaskStatus').checked;

            if (newTaskName.trim() === '') return;

            await taskRequest(newTaskStatus, newTaskName);  // Add task to the database
            fetchTasks();  // Refresh the task list to show the new task
            taskField.remove();  // Remove the form after submission
        };

        addTaskButton.parentNode.insertBefore(taskField, addTaskButton.nextSibling);
        console.log("Task form added.");
    } else {
        console.log("You need to show tasks before adding.");
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
        console.log('Task added successfully');
    } catch (error) {
        console.error('Error adding task', error);
    }
}

function editTask(task, taskId) {
        const taskElement = document.getElementById(taskId);
        if (taskElement) {
            // Replace task text with an input field to edit the task
            const inputField = document.createElement('input');
            inputField.type = 'text';
            inputField.value = task;

            // Replace the current task text with the input field
            taskElement.innerHTML = '';
            taskElement.appendChild(inputField);

            // create a save button
            const saveButton = document.createElement('button');
            saveButton.textContent = 'Save';
            taskElement.appendChild(saveButton);

            saveButton.addEventListener('click', async () => {
                const newTaskValue = inputField.value;
                const success = await editRequest(taskId, newTaskValue);

                
                if (success) {
                    // Update the task's text with the new value
                    taskElement.innerHTML = `
                        <input type="checkbox" ${statusValue ? 'checked' : ''}>
                        ${newTaskValue}
                        <button id="delete-item" onclick="deleteTask('${taskId}')">Delete</button>
                        <button id="edit-item" onclick="editTask('${newTaskValue}', '${taskId}')">Edit</button>
                    `;
                    console.log('Task edited and updated successfully.');
                }
            });
    } else {
        console.error('Task element not found.');
    }
}

function showEditTaskForm(taskId, currentTask, currentStatus) {
    const existingForm = document.querySelector('#editTaskForm');
    if (existingForm) {
        existingForm.remove();
    }

    const li = document.getElementById(`task-${taskId}`);
    const editForm = document.createElement('form');
    editForm.id = 'editTaskForm';

    editForm.innerHTML = `
        <input type="text" id="editTaskName" value="${currentTask}">
        <input type="checkbox" id="editTaskStatus" ${currentStatus ? 'checked' : ''}>
        <button type="submit">Save</button>
        <button type="button" onclick="this.closest('form').remove()">Cancel</button>
    `;

    editForm.onsubmit = async (e) => {
        e.preventDefault();
        const editedTaskName = document.querySelector('#editTaskName').value;
        const editedTaskStatus = document.querySelector('#editTaskStatus').checked;

        await updateTaskStatus(taskId, editedTaskStatus, editedTaskName);
        fetchTasks();  // Refresh the task list to show updated tasks
    };

    li.appendChild(editForm);
}



async function editRequest(taskId, newTaskValue) {
    try {
        const response = await fetch (`/api/tasks/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ task: newTaskValue})
        });
        if (!response.ok) {
            throw new Error('failed to edit task.')
        }
        console.log('task edited successfully.')
    } catch (error) {
        console.error('Error editing task', error);
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