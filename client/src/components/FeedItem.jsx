import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import convertDate from '../helpers/convertDate';
import thumbsup from "../assets/fa-icons/thumbsup.svg";
import thumbsupChecked from "../assets/fa-icons/thumbsupChecked.svg"

function FeedItem({ post }) {
  const [isChecked, setIsChecked] = useState(false);

  function toggleThumbsUp(){
    setIsChecked(!isChecked);
  }

  return (
    <Card className="my-4">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p>{post.content}</p>
          <footer className="blockquote-footer mt-0 d-flex justify-content-between">
            <span>@{post.username}</span>
            <img onClick={toggleThumbsUp} src={isChecked ? thumbsupChecked : thumbsup} alt="thumbs up" />
            {post.published && convertDate(post.published)}
          </footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default FeedItem;