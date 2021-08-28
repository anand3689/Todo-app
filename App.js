import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [item, setItem] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [update, setUpdate] = useState(null);

  useEffect(() => {
    getLocalTodo();
  }, []);

  useEffect(() => {
    saveLocalTodos();
  }, [item]);
  const addHandler = e => {
    e.preventDefault();
    if (!input) {
      alert("Please enter the text");
    } else if (input && toggle) {
      setItem(
        item.map(edt => {
          if (edt.id === update) {
            return { ...edt, name: input };
          }
          return edt;
        })
      );
      setInput("");
      setToggle(false);
      setUpdate(null);
    } else {
      const allInput = { name: input, id: new Date().getTime().toString() };

      setItem([...item, allInput]);
      setInput("");
    }
  };

  const deleteHandler = elem => {
    let filteredItem = item.filter(fil => fil.id !== elem.id);
    setItem(filteredItem);
  };

  const editHandler = elem => {
    let editItem = item.find(tgt => tgt.id === elem.id);
    setInput(editItem.name);
    setToggle(true);
    setUpdate(elem.id);
  };

  const saveLocalTodos = () => {
    localStorage.setItem("todos", JSON.stringify(item));
  };

  const getLocalTodo = () => {
    if (localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      let localTodo = JSON.parse(localStorage.getItem("todos"));
      console.log(localTodo);
      setItem(localTodo);
    }
  };

  return (
    <div className="App">
      <div className="input-item">
      <form type="submit">
        <input
          type="text"
          placeholder="Enter Text..."
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button onClick={addHandler}>{toggle ? "Update" : "Add Task"}</button>
        </form>
        </div>
      <div className="item">
      {item.map(elem => {
        return (
          <div key={elem.id} className="item-list">
            <li>{ elem.name }</li>
            <div className="action">
            <button onClick={() => editHandler(elem)} id="edit">Edit</button>
              <button onClick={ () => deleteHandler( elem ) } id= "delete">Delete</button>
              </div>
          </div>
        );
      } ) }
        </div>
    </div>
  );
}

export default App;
