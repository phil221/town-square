import React, { useState, createContext, useRef } from "react";
import Axios from 'axios';

export type Post = {
  _id?: string;
  username: string;
  content: string;
  numLikes: number;
  published: string;
}

interface PostsContextType {
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  updatePostLikes: (post: Post) => void;
}

export const PostsContext = createContext<PostsContextType | null>(null);

interface Props {
  children: React.ReactNode | React.ReactNode[];
}

export const PostsContextProvider = ({ children }: Props): JSX.Element => {
    const [posts, setPosts] = useState<Post[] | []>([]);
    const inputRef = useRef(null);
    

      function updatePostLikes(post: Post): void {
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
        updatePostLikes,
        inputRef
      }

      return (
        <PostsContext.Provider value={value}>
            {children}
        </PostsContext.Provider>
      )
}

export default PostsContext;