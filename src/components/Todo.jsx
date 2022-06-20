import React, { useState } from "react";

function Todo() {
  const [todos, setTodos] = useState([]);
  const [newItem, setNewItem] = useState("");

  const updateInput = (key, value) => {
    return { [key]: value };
  };

  const addItem = (id, tittle) => {
    const newItems = {
      id: 1 + Math.random(),
      value: newItem.slice(),
      isCheckboxed: false,
      isDone: false,
    };

    setTodos(todos);

    todos.push(newItem);

    setTodos(newItems);
  };

  const deleteItem = (id) => {
    setTodos(todos);

    const updatedTodos = todos.filter((item) => item.id !== id);

    setTodos(updatedTodos);
  };
  const editItem = (id) => {
    const filterItems = todos.filter((item) => item.id !== id);

    const selectItem = todos.find((item) => item.id === id);

    setTodos(filterItems, selectItem);
  };

  const deleteAll = (id) => {
    setTodos(todos);

    const updatedTodos = todos.filter((item) => item.id === id);

    setTodos(updatedTodos);
  };

  const isCheckboxed = (e) => {
    const isCheckboxedArray = todos.map((todo) => {
      if (e.target.parentElement.childNodes[0].textContent === todo.value) {
        return {
          ...todo,
          isCheckboxed: !todo.isCheckboxed,
        };
      }
      return todo;
    });
    setTodos(isCheckboxedArray);
  };

  const taskIsDone = (e) => {
    const isDoneTodo = todos.map((todo) => {
      if (todo.id === e) {
        return {
          ...todo,
          isDone: !todo.isDone,
        };
      }
      return todo;
    });
    setTodos(isDoneTodo);
  };

  const deleteAllFinishedTask = () => {
    const newTodos = todos.filter((todo) => todo.isDone !== true);
    setTodos(newTodos);
  };

  const deleteCheckboxedTask = () => {
    const newTodos = todos.filter((todo) => todo.isCheckboxed !== true);
    setTodos(newTodos);
  };

  return (
    <div>
      <h1 className="app-title">To Do List</h1>

      <div className="container">
        <div
          style={{
            padding: 40,
            textAlign: "center",
            maxWidth: 500,
            margin: "auto",
            color: "rgb(194, 222, 206)",
          }}
        >
          Add an Item...
          <br />
          <input // კომპონენტი 3.0
            type="text"
            placeholder="Type here..."
            value={addItem.newItems}
            onChange={(e) => updateInput("newItem", e.target.value)}
          />
          <button // კომპონენტი 4.1, 4.2.
            type="submit"
            className="add-btn btn-floating"
            onClick={addItem()}
            disabled={addItem.newItems}
          >
            <i className="material-icons">add</i>
          </button>
          <br /> <br />
          <ul>
            {todos.map((item) => {
              return (
                <li key={item.id}>
                  {item.value}

                  <input
                    type="checkbox"
                    onClick={(event) => isCheckboxed(event)}
                  />
                  <button
                    className="btn btn-floating"
                    onClick={deleteItem(item.id)}
                  >
                    <i className="material-icons">delete</i>
                  </button>

                  <button
                    className="btn btn-floating"
                    onClick={editItem(item.id)}
                  >
                    <i className="material-icons">edit</i>
                  </button>
                  <button
                    className={item.isDone ? "floating" : "btn btn-floating"}
                    onClick={taskIsDone(item.id)}
                  >
                    <i className="material-icons">Complete</i>
                  </button>
                </li>
              );
            })}
            <br></br>
            <button className="button" onClick={deleteAll()}>
              <i class="material-icons">Delete All</i>
            </button>
            <br></br>
            <button
              className="button"
              color="red"
              onClick={deleteAllFinishedTask()}
            >
              <i class="material-icons">Delete Done Todos</i>
            </button>

            <br></br>
            <button className="button" onClick={deleteCheckboxedTask()}>
              <i class="material-icons">Delete CheckBoxed Tasks</i>
            </button>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default Todo;
