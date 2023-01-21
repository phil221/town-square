import React, { useState, useContext } from "react";
import { PostsContext } from "../contexts/PostsContext";
import PostForm from "../components/PostForm";
import Axios from 'axios';

export default function ShareSection() {
  const { posts, setPosts } = useContext(PostsContext);
  const [formState, setFormState] = useState({ username: "", post: "" });

    function addPost(){
        Axios.post("http://localhost:3001/createPost", 
          { 
            username: formState.username, 
            content: formState.post, 
            published: Date.now(), 
            numLikes: 0 
          })
          .then(res => {
            console.log(res)
            let newList = [...posts];
            newList.unshift(
              { 
                username: formState.username, 
                content: formState.post, 
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
          formState={formState}
          setFormState={setFormState}
          addPost={addPost}
        />
    </div>
  )
}
