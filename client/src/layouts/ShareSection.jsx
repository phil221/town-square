import React, { useState } from "react";
import Axios from 'axios';

export default function ShareSection() {
    const [name, setName] = useState("");
    const [age, setAge] = useState(0);
    const [username, setUsername] = useState("");

    function addUser({ setUserList }){
        Axios.post("http://localhost:3001/createUser", { name, age, username })
          .then(res => {
            setUserList(prev => [...prev, { name, age, username }])
          })
          .catch(err => alert(err))
      }
      
  return (
    <div className="">
        <input onChange={(e) => setName(e.target.value)} type="text" placeholder="Name..." />
        <input onChange={(e) => setAge(e.target.value)} type="text" placeholder="Age..." />
        <input onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Username..." />
        <button onClick={addUser}>Submit</button>
    </div>
  )
}
