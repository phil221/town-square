import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

type Props = {
  formState: {
    username: string;
    post: string;
  };
  setFormState: React.Dispatch<React.SetStateAction<Props["formState"]>>;
  addPost: () => void; 
}

function PostForm(
    { 
      formState, 
      setFormState, 
      addPost 
    } : Props
  ) {

  function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    addPost();
    setFormState({ username: "", post: "" })
  }

  return (
    <Form onSubmit={e => handleSubmit(e)}>
      <Form.Group className="mb-3" controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control 
          onChange={(e) => setFormState({...formState, username: e.target.value })} 
          value={formState.username} 
          type="text" 
          placeholder="Enter a username" 
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicContent">
        <Form.Label>Post Content</Form.Label>
        <Form.Control 
          as="textarea" 
          rows={5} 
          onChange={(e) => setFormState({...formState, post: e.target.value })} 
          value={formState.post} 
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