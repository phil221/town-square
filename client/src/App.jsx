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
      getPosts();
  }, [])

  function getPosts(){
      Axios.get("http://localhost:3001/getPosts")
      .then(res => setPosts(res.data))
      .catch(err => console.log(err))
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
            <Feed posts={posts} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
