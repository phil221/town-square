import React from "react";
import FeedItem from "../components/FeedItem";
import usePostsContext from "../hooks/usePostsContext";

export default function Feed() {
  const { posts } = usePostsContext();

  return (
    <div className="posts-list">
        <ul className="px-3 px-lg-5">
          { 
            !!posts?.length && posts.map((post, i) => {
              return (
                <FeedItem 
                  key={`post-${i}`} 
                  post={post}
                />
              )
            })
          }
          { !posts?.length && <p>Looking for posts...</p> }
        </ul>
      </div>
  )
}
