import React, { useState, useEffect, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Nav, Card, Button, Form, InputGroup } from 'react-bootstrap';
import { FaHome, FaHeart, FaComment, FaShare, FaEye, FaStar } from 'react-icons/fa';
import { Context } from '../store/appContext.js';

export const Dashboard = () => {
  const { store, actions } = useContext(Context);
  const [posts, setPosts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [comments, setComments] = useState({}); // { postId: [comments] }

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    const fetchedPosts = await actions.getPosts();
    if (fetchedPosts) {
      setPosts(fetchedPosts);
    }
  };

  const handlePost = async () => {
    if (newPost.trim()) {
      const author_id = 1;  // Cambia según el usuario autenticado
      const newPostEntry = await actions.addPost("New Post Title", newPost, author_id);
      if (newPostEntry) {
        setPosts([newPostEntry, ...posts]);
        setNewPost('');
      }
    }
  };

  const handleFavorite = (post) => {
    if (!favorites.some(fav => fav.id === post.id)) {
      setFavorites([...favorites, post]);
    }
  };

  const handleComment = (postId, comment) => {
    if (comment.trim()) {
      // enviar el comentario al back para que se grabe mediante un accion de flux
      // hcaer un accion que haga un Get de los Comentarios de este Post y El Resultado Grabarlos  con setComments
      // setComments({
      //   ...comments,
      //   [postId]: [...(comments[postId] || []), comment]
      // });
    }
  };

  return (
    <Container fluid>
      <Row>
        {/* Barra lateral izquierda */}
        <Col md={2} className="bg-dark text-white vh-100">
          <Nav className="flex-column p-3">
            <Nav.Link className="text-white" href="#home"><FaHome /> Home</Nav.Link>
            <Button variant="primary" className="mt-4">Post</Button>
          </Nav>
        </Col>

        {/* Columna principal (feed de publicaciones) */}
        <Col md={6} className="text-light">
          <Card className="mb-3 p-3">
            <InputGroup>
              <Form.Control
                as="textarea"
                placeholder="What is happening?!"
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
              />
              <Button onClick={handlePost} variant="primary">Post</Button>
            </InputGroup>
          </Card>

          {posts.map((post) => (
            <Card className="mb-3" key={post.id}>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="fw-bold">{post.author_name}</div>
                  <small className="text-muted">{new Date(post.created_at).toLocaleString()}</small>
                </div>
                <Card.Text>{post.content}</Card.Text>
                <div className="d-flex justify-content-between text-muted">
                  <div><FaComment /> {comments[post.id]?.length || 0}</div>
                </div>
                {/* Sección de Comentarios */}
                <div className="mt-3">
                  <Form.Group controlId={`comment-${post.id}`}>
                    <Form.Control
                      type="text"
                      placeholder="Write a comment..."
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleComment(post.id, e.target.value);
                          e.target.value = '';
                        }
                      }}
                    />
                  </Form.Group>
                  {comments[post.id]?.map((comment, index) => (
                    <Card.Text key={index} className="text-muted small ms-3">- {comment}</Card.Text>
                  ))}
                </div>
              </Card.Body>
            </Card>
          ))}
        </Col>

        {/* Barra lateral derecha */}
        <Col md={4} className="bg-dark">
          {/* Sección de Favoritos */}
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Favorites</Card.Title>
              {favorites.length > 0 ? (
                <ul className="list-unstyled">
                  {favorites.map((fav) => (
                    <li key={fav.id}>{fav.content}</li>
                  ))}
                </ul>
              ) : (
                <p>No favorites yet</p>
              )}
            </Card.Body>
          </Card>

          {/* Sección de tendencias */}
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>What's happening</Card.Title>
              <ul className="list-unstyled">
                <li>#DoNotConcedeKamala</li>
                <li>#Election2024</li>
                <li>#WhereIsKamala</li>
                <li>#20MILLION</li>
              </ul>
              <Button variant="link" className="p-0">Show more</Button>
            </Card.Body>
          </Card>

        
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Who to follow</Card.Title>
              <ul className="list-unstyled">
                <li>Samir Makwana <Button variant="outline-primary" size="sm">Follow</Button></li>
                <li>Rivers Cuomo <Button variant="outline-primary" size="sm">Follow</Button></li>
                <li>Jane Doe <Button variant="outline-primary" size="sm">Follow</Button></li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
