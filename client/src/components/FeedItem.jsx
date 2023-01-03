import Card from 'react-bootstrap/Card';
import convertDate from '../helpers/convertDate';

function FeedItem({ post }) {

  return (
    <Card className="my-4">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p>{post.content}</p>
          <footer className="blockquote-footer mt-0 d-flex justify-content-between">
            <span>@{post.username}</span>
            {post.published && convertDate(post.published)}
          </footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default FeedItem;