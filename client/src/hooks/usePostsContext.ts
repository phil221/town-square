import { useContext } from 'react';
import PostsContext from '../contexts/PostsContext';

function usePostsContext() {
  const postsCtx = useContext(PostsContext);

  if(postsCtx === null) throw new Error("Context is null");

  return postsCtx;
}

export default usePostsContext;