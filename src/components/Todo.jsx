import { useState } from "react";

function Todo() {
  const [newItem, setNewItem] = useState("");
  const [todos, setTodos] = useState([]);
  const [editID, setEditId] = useState(null);

  const updateInput = (value) => {
    setNewItem(value);
  };

  // კომპონენტი 5
  const addItem = () => {
    const newID = todos.length === 0 ? 1 : todos[todos.length - 1].id + 1;
    const newTask = {
      id: newID,
      value: newItem,
      isCheckboxed: false,
      isDone: false,
    };
    setTodos([...todos, newTask]);
    setNewItem("");
  };

  const deleteItem = (id) => {
    const updatedTodos = todos.filter((item) => item.id !== id);
    setTodos(updatedTodos);
  };
  const editItem = (id) => {
    setEditId(id);
    todos.forEach((item) => {
      if (item.id === id) {
        setNewItem(item.value);
      }
    });
  };
  const edit = () => {
    const newTodos = todos;
    newTodos.map((item) => {
      if (item.id === editID) {
        item.value = newItem;
      }
    });
    setTodos(newTodos);
    setNewItem("");
    setEditId(null);
  };

  const deleteAll = (id) => {
    const updatedTodos = todos.filter((item) => item.id === id);
    setTodos(updatedTodos);
  };

  const isCheckboxed = (id, e) => {
    const isCheckboxedArray = todos.map((todo) => {
      if (id === todo.id) {
        return {
          ...todo,
          isCheckboxed: !todo.isCheckboxed,
        };
      }
      return todo;
    });
    setTodos(isCheckboxedArray);
  };
  const taskIsDone = (id) => {
    const isDoneTodo = todos.map((todo) => {
      if (todo.id === id) {
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
            value={newItem}
            onChange={(e) => updateInput(e.target.value)}
          />
          <button // კომპონენტი 4.1, 4.2.
            type="submit"
            className="add-btn btn-floating"
            onClick={editID === null ? addItem : edit}
          >
            {editID === null ? (
              <i className="material-icons">add</i>
            ) : (
              <i className="material-icons">update</i>
            )}
          </button>
          <br /> <br />
          {todos.length > 0 && (
            <ul>
              {todos.map((item) => {
                console.log(todos);
                return (
                  <li key={item.id}>
                    {item.value}
                    <input
                      type="checkbox"
                      onClick={(event) => isCheckboxed(item.id, event)}
                    />
                    <button
                      className="btn btn-floating"
                      onClick={() => deleteItem(item.id)}
                    >
                      <i className="material-icons">delete</i>
                    </button>

                    <button
                      className="btn btn-floating"
                      onClick={() => editItem(item.id)}
                    >
                      <i className="material-icons">edit</i>
                    </button>
                    <button
                      className={item.isDone ? "floating" : "btn btn-floating"}
                      onClick={() => taskIsDone(item.id)}
                    >
                      <i className="material-icons">Complete</i>
                    </button>
                  </li>
                );
              })}
              <br></br>
              <button className="button" onClick={() => deleteAll()}>
                <i className="material-icons">Delete All</i>
              </button>
              <br></br>
              <button
                className="button"
                color="red"
                onClick={() => deleteAllFinishedTask()}
              >
                <i className="material-icons">Delete Done Todos</i>
              </button>
              <br></br>
              <button className="button" onClick={() => deleteCheckboxedTask()}>
                <i className="material-icons">Delete CheckBoxed Tasks</i>
              </button>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
export default Todo;
