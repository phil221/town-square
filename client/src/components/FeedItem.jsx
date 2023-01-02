import Card from 'react-bootstrap/Card';

function FeedItem({ post }) {
  return (
    <Card className="my-4">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p>{post.content}</p>
          <footer className="blockquote-footer mt-0">
            @{post.username}
          </footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default FeedItem;