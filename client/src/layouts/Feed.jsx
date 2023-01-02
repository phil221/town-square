import React from "react";

export default function Feed({ userList }) {

  return (
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
      </div>
  )
}
