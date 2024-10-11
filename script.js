document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function createTodoElement(todo, index) {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        li.innerHTML = `
            <span>${todo.text}</span>
            <div class="todo-actions">
                <button class="edit-btn" title="Edit"><i class="fas fa-edit"></i></button>
                <button class="delete-btn" title="Delete"><i class="fas fa-trash-alt"></i></button>
                <button class="complete-btn" title="${todo.completed ? 'Mark as incomplete' : 'Mark as complete'}">
                    <i class="fas ${todo.completed ? 'fa-undo' : 'fa-check'}"></i>
                </button>
            </div>
        `;

        li.querySelector('.edit-btn').addEventListener('click', () => editTodo(index));
        li.querySelector('.delete-btn').addEventListener('click', () => deleteTodo(index));
        li.querySelector('.complete-btn').addEventListener('click', () => toggleComplete(index));

        return li;
    }

    function renderTodos() {
        todoList.innerHTML = '';
        todos.forEach((todo, index) => {
            const todoElement = createTodoElement(todo, index);
            todoList.appendChild(todoElement);
        });
    }

    function addTodo(text) {
        todos.push({ text, completed: false });
        saveTodos();
        renderTodos();
    }

    function editTodo(index) {
        const newText = prompt('Edit task:', todos[index].text);
        if (newText !== null && newText.trim() !== '') {
            todos[index].text = newText.trim();
            saveTodos();
            renderTodos();
        }
    }

    function deleteTodo(index) {
        todos.splice(index, 1);
        saveTodos();
        renderTodos();
    }

    function toggleComplete(index) {
        todos[index].completed = !todos[index].completed;
        saveTodos();
        renderTodos();
    }

    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const todoText = todoInput.value.trim();
        if (todoText) {
            addTodo(todoText);
            todoInput.value = '';
        }
    });

    renderTodos();
});