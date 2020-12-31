import React, { useEffect, useState } from "react";
import Axios from "axios";
import "./App.css";
import Todo from "./components/Todo";
import TodoForm from "./components/TodoForm";

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)

function App() {
  const [todos, setTodos] = React.useState([]);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [signup, setsignup] = useState(false);
  const [shareableURL, setshareableURL] = useState(null);

  function closeModal() {
    setIsOpen(false);
  }

  async function getShareableLink() {
    const url = await Axios.post(`http://localhost:3002/lists`, { id: userToken()});
    await setshareableURL(`http://localhost:3002/lists/${url.data.url}`);
    setURL()
  }

  function handleSignup() {
    setsignup(true);
  }

  const removeTodo = async (id) => {
    await Axios.delete(`http://localhost:3002/todos/${id}`);
    fetchTodos();
  };

  const completed = async (id) => {
    await Axios.get(`http://localhost:3002/todos/${id}/completed?`);
    fetchTodos();
  };

  const handleSubmit = () => {
    fetchTodos();
  };

  const fetchTodos = async () => {
    const resp = await Axios.get(
      `http://localhost:3002/todos?token=${userToken()}`
    );
    setTodos(resp.data.todos);
  };

  useEffect(() => {
    if (userToken().length > 0) {
      fetchTodos();
      getURL() && setshareableURL(getURL());
    } else {
      setIsOpen(true);
    }
  }, [modalIsOpen]);

  const userToken = () => {
    return window.localStorage.getItem("auth-token") || "";
  };

  const setURL = () => {
    return window.localStorage.setItem("listurl", shareableURL);

  }
  const getURL = () => {
    return window.localStorage.getItem("listurl") || null
  }

  const logout = () => {
    window.localStorage.clear();
    window.location = "/";
  };
  // console.warn(token.length == 0)
  return (
    <>
      {modalIsOpen ? (!signup ?
        <UserSignin onRequestClose={closeModal} handleSignup={handleSignup} />
        : < UserSignup onRequestClose={closeModal} />) : (
          <div className="app" id="modal">
            <a onClick={logout}>Logout</a>
            {
              shareableURL ? <h5>{shareableURL}</h5> : <a onClick={getShareableLink}>Create Shareable Link</a>
            }
            <div className="username">
              {window.localStorage.getItem("username")}
            </div>
            <div className="headerName">ToDo App</div>
            <TodoForm handleSubmit={handleSubmit} />
            <div className="todo-list">
              {todos.map((todo, index) => (
                <Todo
                  key={index}
                  index={index}
                  todo={todo}
                  handleRemove={removeTodo}
                  completed={completed}
                />
              ))}
            </div>
          </div>
        )}
    </>
  );
}

const UserSignup = ({ modalIsOpen, onRequestClose }) => {
  const [val, setVal] = useState({
    name: "",
    email: "",
    password: "",
  });
  const validateForm = () => {
    const { name, email, password } = val;
    return name.length > 0 && email.length > 0 && password.length > 0;
  };

  const handleChange = (e) => {
    setVal({ ...val, [e.target.name]: e.target.value });
  };
  const createUser = async () => {
    console.log(val);
    const resp = await Axios.post("http://localhost:3002/users", val);
    if (resp.status === 200) {
      window.localStorage.setItem("auth-token", resp.data.user.uuid);
      window.localStorage.setItem("username", resp.data.user.name);
      onRequestClose();
    }
  };
  return (
    <div className="signupContainer">
      <div className="formContainer">
        <div className="formLabel">Name</div>
        <input
          value={val.name}
          name="name"
          type="text"
          required
          className="nameField"
          placeholder="Name"
          onChange={handleChange}
        />
      </div>
      <div className="formContainer">
        <div className="formLabel">Email</div>
        <input
          value={val.email}
          name="email"
          type="email"
          required
          className="nameField"
          placeholder="Email"
          onChange={handleChange}
        />
      </div>
      <div className="formContainer">
        <div className="formLabel">Password</div>
        <input
          value={val.password}
          name="password"
          type="password"
          required
          className="nameField"
          placeholder="Password"
          onChange={handleChange}
        />
      </div>
      {validateForm() && (
        <div className="enterButton" onClick={createUser}>
          Enter &rarr;
        </div>
      )}
    </div>
  );
};

const UserSignin = ({ modalIsOpen, onRequestClose, handleSignup }) => {
  const [err, setErr] = useState("");
  const [val, setVal] = useState({
    email: "",
    password: "",
  });
  const validateForm = () => {
    const { email, password } = val;
    return email.length > 0 && password.length > 0;
  };

  const handleChange = (e) => {
    err.length > 0 && setErr("");
    setVal({ ...val, [e.target.name]: e.target.value });
  };
  const createUser = async () => {
    console.log(val);
    const resp = await Axios.post("http://localhost:3002/users/login", val);
    if (resp.data.code === 200) {
      window.localStorage.setItem("auth-token", resp.data.user.uuid);
      window.localStorage.setItem("username", resp.data.user.name);
      onRequestClose();
    } else {
      debugger;
      setErr(resp.data.message);
    }
  };
  return (
    <div className="signupContainer">
      <div>Sign In</div>
      <div className="formContainer">
        <div className="formLabel">Email</div>
        <input
          value={val.email}
          name="email"
          type="email"
          required
          className="nameField"
          placeholder="Email"
          onChange={handleChange}
        />
      </div>
      <div className="formContainer">
        <div className="formLabel">Password</div>
        <input
          value={val.password}
          name="password"
          type="password"
          required
          className="nameField"
          placeholder="Password"
          onChange={handleChange}
        />
      </div>
      {validateForm() && (
        <div className="enterButton" onClick={createUser}>
          Enter &rarr;
        </div>
      )}
      {err.length > 0 && <div className="errmsg">{err}</div>}
      <button onClick={handleSignup}>SignUp Instead</button>
    </div>
  );
};

export default App;
