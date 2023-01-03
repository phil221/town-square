import { useState } from 'react';
import Axios from 'axios';
import Card from 'react-bootstrap/Card';
import convertDate from '../helpers/convertDate';
import thumbsup from "../assets/fa-icons/thumbsup.svg";
import thumbsupChecked from "../assets/fa-icons/thumbsupChecked.svg"

function FeedItem({ post }) {
  const [isChecked, setIsChecked] = useState(false);
  

  function handleThumbsUp(){
    setIsChecked(!isChecked);
    Axios.put("http://localhost:3001/updatePostLikes", { id: post._id, likes: post.numLikes+1 })
      .then((res) => console.log(res))
  }

  return (
    <Card className="my-4">
      <Card.Body className="p-4">
        <blockquote className="blockquote mb-0">
          <p className='mb-2'>{post.content}</p>
          <footer className="blockquote-footer mt-0">
            <span>@{post.username}</span>
          </footer>
        </blockquote>
          <div className="item-actions d-flex align-items-center justify-content-between mt-2 pt-3">
            <div onClick={handleThumbsUp} className="d-flex like-section">
              <p style={{ fontWeight: isChecked ? "bold" : "" }} className='like-text mb-0'>Like</p>
              <img className='like-image mx-2' src={isChecked ? thumbsupChecked : thumbsup} alt="thumbs up" />
              {post.numLikes}
            </div>
            <p className='mx-5 mb-0'>Comment</p>
            <div className="text-secondary">{post.published && convertDate(post.published)}</div>
          </div>
      </Card.Body>
    </Card>
  );
}

export default FeedItem;