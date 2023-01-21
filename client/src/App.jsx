import { useEffect, useContext } from "react";
import Axios from 'axios';
import PostsContext from "./contexts/PostsContext";
import './App.css';
import ShareSection from "./layouts/ShareSection";
import Feed from "./layouts/Feed";
import Header from "./components/Header";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function App() {
  const { setPosts } = useContext(PostsContext);

 
  useEffect(() => {
    Axios.get("http://localhost:3001/posts")
    .then(res => {
      // display most recent posts first
      // refactor this, probably
      setPosts(res.data.reverse())
    })
    .catch(err => console.log(err))
  }, [])


  return (
    <div className="App">
        <Header />
        <Container className="site-main" fluid>
          <Row>
            <Col className="share-section p-5" xs={4}>
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
