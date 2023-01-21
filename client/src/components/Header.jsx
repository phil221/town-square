import { useContext } from 'react';
import { PostsContext } from "../contexts/PostsContext";
import bugle from "../assets/images/bugle.png";
import Navbar from 'react-bootstrap/Navbar';

export default function Header() {
  const { inputRef } = useContext(PostsContext);

  const focusForm = (e) => {
    e.preventDefault();

    inputRef.current.focus();
  }

  return (
    <header className="site-header py-4 px-5">
       <Navbar bg="white" expand="md">
         <Navbar.Brand href="/" onClick={focusForm}>
            <img className='header-logo' src={bugle} alt="town square bugle logo" /> 
        </Navbar.Brand>
        <div className="d-flex flex-column">
            <Navbar.Text>
                <h1 className='mr-3'>Town Square</h1>
            </Navbar.Text>
            <Navbar.Text>
                <p className='mt-0 mx-1 mb-1'>Share ideas, questions, quotes, etc.</p>
            </Navbar.Text>
        </div>
     </Navbar>
    </header>
  )
}
