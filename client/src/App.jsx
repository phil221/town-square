import { useState, useEffect } from "react";
import Axios from 'axios';
import './App.css';
import ShareSection from "./layouts/ShareSection";
import Feed from "./layouts/Feed";
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
      <Container fluid>
        <Row>
          <Col className="share-section p-5" xs={4}>
            <ShareSection setPosts={setPosts} />
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
