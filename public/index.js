async function fetchTasks() {
    try {
        const response = await fetch('/api/tasks');
        const tasks = await response.json();

        const taskList = document.getElementById('task-list');
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.textContent = `${task.id}: ${task.task} - ${task.status ? 'completed': 'pending'}`;
            taskList.appendChild(li);
        });
    } catch(error) {
        console.error('Error fetching tasks:', error);
    }
}