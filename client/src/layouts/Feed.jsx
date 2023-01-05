import React from "react";
import FeedItem from "../components/FeedItem";

export default function Feed({ posts, updatePostLikes }) {
  return (
    <div className="posts-list">
        <ul className="px-3 px-lg-5">
          { 
            !!posts.length && posts.map((post, i) => {
              return (
                <FeedItem key={`post-${i}`} posts={posts} post={post} updatePostLikes={updatePostLikes}  />
              )
            })
          }
          { !posts.length && <p>Looking for posts...</p> }
        </ul>
      </div>
  )
}
