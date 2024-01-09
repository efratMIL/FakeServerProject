import React, { useState } from "react";

function Todo() {
  const [todos, setTodos] = useState([]);

  const [selectedFilter, setSelectedFilter] = useState("sequential");

  const handleToggleComplete = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };
  const handleAddTodo = (newTitle) => {
    setTodos((prevTodos) => [
      ...prevTodos,
      { id: prevTodos.length + 1, title: newTitle, completed: false }
    ]);
  };
  
  const handleDeleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const handleUpdateTodo = (id, newTitle) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, title: newTitle } : todo
      )
    );
  };

 // ... (previous code)

const handleFilterChange = (event) => {
    const newFilter = event.target.value;
  
    setSelectedFilter(newFilter);
  
    switch (newFilter) {
      case "sequential":
        setTodos((prevTodos) => [...prevTodos].sort(() => Math.random() - 0.5));
        break;
      case "completed":
        setTodos((prevTodos) =>
          prevTodos.sort((a, b) =>
            a.completed === b.completed ? 0 : a.completed ? 1 : -1
          )
        );
        break;
      case "alphabetical":
        setTodos((prevTodos) =>
          prevTodos.sort((a, b) => a.title.localeCompare(b.title))
        );
        break;
      default:
        break;
    }
  };
  
  

  return (
    <>
      <div>
        <button   onClick={() => {
                const newToDo = prompt("Enter new To Do:", );
                if (newToDo !== null) {
                  handleAddTodo(newToDo);
                }}}>Add To Do</button>
        <label>
          Sort by:
          <select value={selectedFilter} onChange={handleFilterChange}>
            <option value="sequential">Sequential</option>
            <option value="completed">Completed</option>
            <option value="alphabetical">Alphabetical</option>
          </select>
        </label>
      </div>
      <div>
        {todos.map((todo) => (
          <div key={todo.id}>
            <span>{todo.id}</span>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleComplete(todo.id)}
            />
            <label>{todo.title}</label>
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
            <button
              onClick={() => {
                const newTitle = prompt("Enter new title:", todo.title);
                if (newTitle !== null) {
                  handleUpdateTodo(todo.id, newTitle);
                }
              }}
            >
              Update
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default Todo;
