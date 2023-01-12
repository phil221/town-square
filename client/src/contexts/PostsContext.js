import { useState, createContext } from "react";
import Axios from 'axios';

export const PostsContext = createContext(null);

export const PostsContextProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);

      function updatePostLikes(post){
        Axios.put("http://localhost:3001/updatePostLikes", { _id: post._id, likes: post.numLikes+1 })
        .then((res) => {
          const postsCopy = [...posts];
          const updatedPosts = postsCopy.map((item, i) => {
            if(item._id === post._id){
              const updatedItem = {
                ...item, numLikes: item['numLikes'] ? item['numLikes']+1 : 1
              }
              return updatedItem;
            }
            return item;
          })
          setPosts(prev => prev = updatedPosts);
        })
        .catch(err => console.error(err))
      }

      const value = {
        posts,
        setPosts,
        updatePostLikes
      }

      return (
        <PostsContext.Provider value={value}>
            {children}
        </PostsContext.Provider>
      )
}

export default PostsContext;