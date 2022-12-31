import { useState, useEffect } from "react";
import Axios from 'axios';
import './App.css';

function App() {
  const [userList, setUserList] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [username, setUsername] = useState("");

  useEffect(() => {
    getUsers();
  }, [userList])
  
  function addUser(){
    Axios.post("http://localhost:3001/createUser", { name, age, username })
      .then(res => {
        setUserList(prev => [...prev, { name, age, username }])
      })
      .catch(err => alert(err))
  }
  
  function getUsers(){
    Axios.get("http://localhost:3001/getUsers")
      .then(res => setUserList(res.data))
      .catch(err => alert(err))
  }

  return (
    <div className="App">
      <div className="UserList">
        <ul>
          { 
            !!userList.length && userList.map((user, i) => {
              return (
                <li key={i}>
                  <div>Name: {user.name}</div>
                  <div>Age: {user.age}</div>
                  <div>Username: {user.username}</div>
                  <br />
                </li>
              )
            })
          }
        </ul>
        <input onChange={(e) => setName(e.target.value)} type="text" placeholder="Name..." />
        <input onChange={(e) => setAge(e.target.value)} type="text" placeholder="Age..." />
        <input onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Username..." />
        <button onClick={addUser}>Submit</button>
      </div>
    </div>
  );
}

export default App;
