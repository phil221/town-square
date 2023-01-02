import { useState, useEffect } from "react";
import Axios from 'axios';
import './App.css';
import ShareSection from "./layouts/ShareSection";
import Feed from "./layouts/Feed";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function App() {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
      getUsers();
  }, [])

  function getUsers(){
      Axios.get("http://localhost:3001/getUsers")
      .then(res => setUserList(res.data))
      .catch(err => alert(err))
  }

  return (
    <div className="App">
      <Container>
        <Row>
          <Col className="share-section pt-5" xs={4}><ShareSection setUserList={setUserList} /></Col>
          <Col className="feed-section pt-5" xs={8}><Feed userList={userList} /></Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
