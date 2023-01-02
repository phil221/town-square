import React from "react";
import FeedItem from "../components/FeedItem";

export default function Feed({ posts }) {

  return (
    <div className="posts-list">
        <ul className="px-3 px-lg-5">
          { 
            !!posts.length && posts.map((post, i) => {
              return (
                <FeedItem key={`post-${i}`} post={post} />
              )
            })
          }
          { !posts.length && <p>No posts found.</p> }
        </ul>
      </div>
  )
}
