import { useEffect } from "react";
import Axios from 'axios';
import './App.css';
import ShareSection from "./layouts/ShareSection";
import Feed from "./layouts/Feed";
import Header from "./components/Header";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import usePostsContext from "./hooks/usePostsContext";
import React from "react";

function App() {
  const { setPosts } = usePostsContext();

 
  useEffect(() => {
    Axios.get("http://localhost:3001/posts")
    .then(res => {
      // display most recent posts first
      // refactor this, probably
      setPosts(res.data.reverse())
    })
    .catch(err => console.log(err))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])



  return (
    <div className="App">
        <Header />
        <Container className="site-main" fluid>
          <Row>
            <Col className="share-section py-5 px-4" xs={4}>
              <ShareSection />
            </Col>
            <Col className="feed-section pt-5" xs={8}>
              <Feed />
            </Col>
          </Row>
        </Container>
    </div>
  );
}

export default App;
