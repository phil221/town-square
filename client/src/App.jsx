import { useState, useEffect } from "react";
import Axios from 'axios';
import './App.css';
import ShareSection from "./layouts/ShareSection";
import Feed from "./layouts/Feed";
import Header from "./components/Header";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/posts")
    .then(res => {
      // display most recent posts first
      setPosts(res.data.reverse())
    })
    .catch(err => console.log(err))
  }, [])

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

  return (
    <div className="App">
      <Header />
      <Container className="site-main" fluid>
        <Row>
          <Col className="share-section p-5" xs={4}>
            <ShareSection posts={posts} setPosts={setPosts} />
          </Col>
          <Col className="feed-section pt-5" xs={8}>
            <Feed posts={posts} updatePostLikes={updatePostLikes} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
