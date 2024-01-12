// Todo component
import React from "react";
import del from "../pictures/delete.png";
import update from "../pictures/update.png";
import './componnents.css'

function Todo({ index, todo, UpdateDataOfTodos, handleDeleteTodo }) {
  return (
    <div className="todoDiv">
      <span className="todoIndex task">{index}</span>
      <br/>
      <span className="task">id: {todo.id}</span>
      <br/>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => UpdateDataOfTodos({ ...todo, completed: !todo.completed })}
      />
      <label className="task"> {todo.title}</label>
      <br />
      <div className="updateAndDelete">
      <img className='deleteImage' src={del} onClick={() => handleDeleteTodo({ ...todo })}></img>
      <img className='updateImage' src={update} onClick={() => {
        const newTitle = prompt("Enter new title:", todo.title);
        if (newTitle !== null) {
          UpdateDataOfTodos({ ...todo, title: newTitle });
        }
      }}></img>
      </div>
    </div>
  );
}

export default Todo;

