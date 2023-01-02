import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function PostForm({ username, setUsername, postBody, setPostBody, addPost }) {

  function handleSubmit(e){
    e.preventDefault();
    addPost();
    setUsername("");
    setPostBody("");
  }

  return (
    <Form onSubmit={e => handleSubmit(e)}>
      <Form.Group className="mb-3" controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control 
          onChange={(e) => setUsername(e.target.value)} 
          value={username} 
          type="text" 
          placeholder="Enter a username" 
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicContent">
        <Form.Label>Post Content</Form.Label>
        <Form.Control 
          as="textarea" 
          rows={5} 
          onChange={(e) => setPostBody(e.target.value)} 
          value={postBody} 
          placeholder="Please share here..." 
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default PostForm;