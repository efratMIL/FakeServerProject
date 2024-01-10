import React, { useState } from "react";

function Todo({setTodos}) {
 

  const handleToggleComplete = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
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




  return (
    <>
   
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
    </>
  );
}

export default Todo;
