import React, { useState } from "react";
import PostForm from "../components/PostForm";
import Axios from 'axios';

export default function ShareSection({ setPosts }) {
  const [username, setUsername] = useState("");
  const [postBody, setPostBody] = useState("");

    function addPost(){
        Axios.post("http://localhost:3001/createPost", { username, content: postBody })
          .then(res => {
            setPosts(prev => [...prev, { username, content: postBody }])
          })
          .catch(err => console.log(err))
      }
      
  return (
    <div className="posts-form mt-4">
        <PostForm 
          username={username}
          setUsername={setUsername}
          postBody={postBody}
          setPostBody={setPostBody}
          addPost={addPost}
        />
    </div>
  )
}
