import React, { useState } from "react";
import PostForm from "../components/PostForm";
import Axios from 'axios';

export default function ShareSection({ posts, setPosts }) {
  const [username, setUsername] = useState("");
  const [postBody, setPostBody] = useState("");

    function addPost(){
        Axios.post("http://localhost:3001/createPost", 
          { 
            username, 
            content: postBody, 
            published: Date.now(), 
            numLikes: 0 
          })
          .then(res => {
            console.log(res)
            let newList = [...posts];
            newList.unshift(
              { 
                username, 
                content: postBody, 
                published: res.data.published, 
                numLikes: 0 
              });
            setPosts(prev => prev = newList);
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
