import React, { useState, useEffect, useContext } from "react";
import Todo from '../componnents/ToDo';
import { userContext } from "../App";
import { serverRequests } from "../Api";
import reset from "../pictures/clear.png";

function Todos() {
  const userData = useContext(userContext);
  const [todos, setTodos] = useState([]);
  const [searcTodos, setSearcTodos] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [selectedSearch, setSelectedSearch] = useState("");
  
  useEffect(() => {
    const fetchDataOfTodos = async () => {
      try {
        const response = await serverRequests('GET', `users/${JSON.stringify(userData.id)}/todos`, null);
        const foundTodos = response;
        setTodos(foundTodos);
        setSearcTodos(foundTodos);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };
      fetchDataOfTodos();
  }, []);

  const UpdateDataOfTodos = (updateTodo) => {
    serverRequests('PUT', `todos/${updateTodo.id}`, updateTodo)
      .then((foundTodo) => {
        setSearcTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo.id === foundTodo.id ? { ...todo, title:foundTodo.title, completed: foundTodo.completed } : todo
          )
        );
        setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === foundTodo.id ? { ...todo, title:foundTodo.title, completed: foundTodo.completed } : todo
        )
      );
      })
      .catch((error) => {
        console.error('Error updating todos:', error);
      });
  };
  
 
  const handleDeleteTodo = (deleteTodo) => {
    serverRequests('DELETE', `todos/${deleteTodo.id}`, deleteTodo).then(()=>{
      setSearcTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== deleteTodo.id));
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== deleteTodo.id))
  })
  };

  const handleAddTodo = (newTitle) => {
    const newTodo={userId: userData.id,title:newTitle,completed:false}
    serverRequests('POST', 'todos', newTodo).then((newTodo)=>{
      setSearcTodos((prevTodos) => [
      ...prevTodos,newTodo])
      setTodos((prevTodos) => [
        ...prevTodos,newTodo]);
    })
  };

  const handleFilterChange = (event) => {
    const newFilter = event.target.value;
    setSelectedFilter(newFilter);

    switch (newFilter) {
      case "randomaly":
        setSearcTodos((prevTodos) => [...prevTodos].sort(() => Math.random() - 0.5));
        break;
      case "completed":
        setSearcTodos((prevTodos) =>
          prevTodos.sort((a, b) =>
            a.completed === b.completed ? 0 : a.completed ? -1 : 1
          )
        );
        break;
      case "alphabetical":
        setSearcTodos((prevTodos) =>
          prevTodos.sort((a, b) => a.title.localeCompare(b.title))
        );
        break;
      case "serial":
        setSearcTodos((prevTodos) =>
          prevTodos.sort((a, b) => a.id - b.id)
        );
        break;
      default:
        break;
    }
  };

  const handleSearchChange = (event) => {
    const newSearch = event.target.value;
    setSelectedSearch(newSearch);
    switch (newSearch) {
      case "toDoNumber":
          const toDoNumber = prompt("Enter To Do Id:");
          if (toDoNumber !== null) {

            const foundTodo = todos.find((todo) => todo.id === parseInt(toDoNumber));

            if (foundTodo) {
              setSearcTodos([foundTodo]);
            } else {
              alert("To Do with the specified number not found");
            }
          }
        break;
      case "title":
        const toDoTitle = prompt("Enter To Do title:");
        if (toDoTitle !== null) {
          const foundTodo = todos.find((todo) => todo.title === toDoTitle);
          if (foundTodo) {
            setSearcTodos([foundTodo]);
          } else {
            alert("To Do with the specified title not found");
          }
        }
        break;
      case "completed":
        setSearcTodos((prevTodos) =>
          prevTodos.filter((todo) => todo.completed)
        );
        break;
      case "unCompleted":
        setSearcTodos((prevTodos) =>
          prevTodos.filter((todo) => todo.completed===false)
        );
        break;
      default:
        break;
    }
  };
  return (
    <>
     <br/>
      <div className="todoButtonsDiV">
      <label>
        Sort by:
        <select value={selectedFilter} onChange={handleFilterChange}>
        <option value="">👇</option>
          <option value="serial" >Serial</option>
          <option value="randomaly">Randomaly</option>
          <option value="completed">Completed</option>
          <option value="alphabetical">Alphabetical</option>
        </select>
      </label>
      
      <label >
        Search by:                     
        <select value={selectedSearch} onChange={handleSearchChange} >
        <option value="">👇</option>
          <option value="toDoNumber" >To Do Id</option>
          <option value="title">Title</option>
          <option value="completed">Completed</option>
          <option value="unCompleted">Un Completed</option>
        </select>
      </label>
      <img  className="clear" src={reset} onClick={()=>setSearcTodos(todos)}></img>
      <button className="todoAddButton"
          onClick={() => {
            const newToDo = prompt("Enter new To Do:");
            if (newToDo !== null) {
              handleAddTodo(newToDo);
            }
          }}
        >
          Add To Do
        </button>
        </div>

      <div className="todosDiv">
      {searcTodos.map((todo,index) => (
        <Todo
          key={todo.id}
          todo={todo}
          index={index+1}
          UpdateDataOfTodos={UpdateDataOfTodos}
          handleDeleteTodo={handleDeleteTodo}
        />
      ))}
      </div>
    </>
  );
}

export default Todos;
