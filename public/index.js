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

let taskisVisible = false;

async function fetchTasks() {
    const taskList = document.getElementById('task-list');
    const toggleButton = document.querySelector('#get-tasks');
    const addTaskButton = document.querySelector('#add_item');
    const deleteTaskButton = document.querySelector('#delete_item');

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

                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.checked = task.status;
                checkbox.onchange = () => updateTaskStatus(task.id, checkbox.checked, task.task);

                const taskText = document.createTextNode(` ${task.task}`);

                li.appendChild(checkbox);
                li.appendChild(taskText);
                taskList.appendChild(li);
            });
            toggleButton.textContent = 'Hide Tasks';
        } catch(error) {
            console.error('Error fetching tasks:', error);
        }
    }
    taskisVisible = !taskisVisible;
}

