document.addEventListener("DOMContentLoaded", function() {
    const addButton = document.getElementById('add-btn');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    // Load tasks from local storage
    loadTasks();

    addButton.addEventListener('click', function() {
        const task = todoInput.value.trim();
        if (task !== '') {
            addTask(task);
            saveTasks();
            todoInput.value = '';
        }
    });

    todoInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const task = todoInput.value.trim();
            if (task !== '') {
                addTask(task);
                saveTasks();
                todoInput.value = '';
            }
        }
    });

    function addTask(task, isCompleted = false) {
        const li = document.createElement('li');
        if (isCompleted) {
            li.classList.add('completed');
        }

        const span = document.createElement('span');
        span.textContent = task;
        span.addEventListener('click', function() {
            li.classList.toggle('completed');
            saveTasks();
        });

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('edit');
        editButton.addEventListener('click', function() {
            const newTask = prompt("Any changes?", span.textContent);
            if (newTask !== null && newTask.trim() !== '') {
                span.textContent = newTask.trim();
                saveTasks();
            }
        });

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Delete';
        removeButton.classList.add('remove');
        removeButton.addEventListener('click', function() {
            todoList.removeChild(li);
            saveTasks();
        });

        li.appendChild(span);
        li.appendChild(editButton);
        li.appendChild(removeButton);
        todoList.appendChild(li);
    }

    function saveTasks() {
        const tasks = [];
        todoList.querySelectorAll('li').forEach(li => {
            tasks.push({
                task: li.querySelector('span').textContent,
                completed: li.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            addTask(task.task, task.completed);
        });
    }
});
