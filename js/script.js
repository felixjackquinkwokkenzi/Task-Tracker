let todos = [];

const listContainer = document.querySelector("#todo-list");
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const filterBtn = document.querySelector(".filter-bar");
const counter = document.querySelector("#todo-counter");
const clearBtn = document.querySelector("#clear-completed-btn");

let currentFilter = "all";

function generateId() {
  return Date.now().toString();
}

function renderCounter() {
  const count = todos.filter((todo) => !todo.completed).length;
  counter.textContent = `${count} task active`;
}

function getFilteredTodos() {
  if (currentFilter === "active") {
    return todos.filter((todo) => !todo.completed);
  }

  if (currentFilter === "completed") {
    return todos.filter((todo) => todo.completed);
  }

  return todos;
}

function getEmptyMessage() {
  if (currentFilter === "active") {
    return "No active tasks. Everything has been completed!";
  }

  if (currentFilter === "completed") {
    return "No tasks have been completed yet.";
  }

  return "No tasks yet. Add your first task above.";
}

function renderTodos() {
  renderCounter();
  listContainer.innerHTML = "";

  const filteredTodos = getFilteredTodos();

  if (filteredTodos.length === 0) {
    const emptyText = document.createElement("li");
    emptyText.className = "empty-state";
    emptyText.textContent = getEmptyMessage();
    listContainer.append(emptyText);
    return;
  }

  filteredTodos.forEach((todo) => {
    const li = document.createElement("li");
    li.className = "todo-item" + (todo.completed ? " completed" : "");
    li.dataset.id = todo.id;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "todo-checkbox";
    checkbox.checked = todo.completed;
    checkbox.setAttribute("aria-label", "Tandai selesai: " + todo.text);

    const span = document.createElement("span");
    span.className = "todo-text";
    span.textContent = todo.text;

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "✕";
    deleteBtn.setAttribute("aria-label", "Hapus: " + todo.text);

    li.append(checkbox, span, deleteBtn);
    listContainer.append(li);
  });
}

function addTodo(text) {
  const newTodo = {
    id: generateId(),
    text: text,
    completed: false,
    createdAt: Date.now(),
  };

  todos.push(newTodo);
  saveTodos();
  renderTodos();
}

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const text = todoInput.value.trim();

  if (text === "") {
    return;
  }

  addTodo(text);

  todoInput.value = "";
});

function toggleTodo(id) {
  todos.forEach((todo) => {
    if (todo.id === id) {
      todo.completed = !todo.completed;
    }
  });

  saveTodos();
  renderTodos();
}

function deleteTodo(id) {
  const li = listContainer.querySelector(`[data-id="${id}"]`);

  if (li) {
    li.classList.add("removing");

    setTimeout(() => {
      todos = todos.filter((todo) => todo.id !== id);
      saveTodos();
      renderTodos();
    }, 200);
  } else {
    todos = todos.filter((todo) => todo.id !== id);
    saveTodos();
    renderTodos();
  }
}

function editTodo(id) {
  const li = listContainer.querySelector(`[data-id="${id}"]`);
  if (!li) return;

  const span = li.querySelector(".todo-text");
  const oldText = span.textContent;

  const input = document.createElement("input");
  input.className = "edit-input";
  input.value = oldText;

  li.replaceChild(input, span);
  input.focus();

  let isCancelled = false;

  function saveEdit() {
    if (isCancelled) return;

    const newText = input.value.trim();

    if (newText !== "") {
      todos.forEach((todo) => {
        if (todo.id === id) {
          todo.text = newText;
        }
      });
    }

    saveTodos();
    renderTodos();
  }

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      saveEdit();
    }

    if (e.key === "Escape") {
      isCancelled = true;
      renderTodos();
    }
  });

  input.addEventListener("blur", saveEdit);
}

listContainer.addEventListener("click", (e) => {
  const li = e.target.closest(".todo-item");
  if (!li) return;

  const id = li.dataset.id;

  if (e.target.classList.contains("todo-checkbox")) {
    toggleTodo(id);
  }

  if (e.target.classList.contains("delete-btn")) {
    deleteTodo(id);
  }
});

listContainer.addEventListener("dblclick", (e) => {
  const li = e.target.closest(".todo-item");
  if (!li) return;

  const id = li.dataset.id;

  editTodo(id);
});

clearBtn.addEventListener("click", () => {
  todos = todos.filter((todo) => !todo.completed);
  saveTodos();
  renderTodos();
});

filterBtn.addEventListener("click", (e) => {
  if (!e.target.classList.contains("filter-btn")) return;

  currentFilter = e.target.dataset.filter;

  document.querySelectorAll(".filter-btn").forEach((b) => {
    b.classList.remove("active");
  });

  e.target.classList.add("active");

  renderTodos();
});

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function loadTodos() {
  const storage = localStorage.getItem("todos");

  if (storage) {
    todos = JSON.parse(storage);
  } else {
    todos = [];
  }
}

loadTodos();
renderTodos();