import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Row, Col, Nav, Card, Button, Form, InputGroup } from 'react-bootstrap';
import { FaHome, FaSearch, FaBell, FaEnvelope, FaBookmark, FaUsers, FaEllipsisH } from 'react-icons/fa';

 export const Dashboard = () => {
  const [posts, setPosts] = useState([
    { username: 'Hodgetwins', text: "Y'all post videos of the meltdown the View is having right now", reactions: { likes: '1.6K', comments: '4.3K', shares: '107K', views: '9.6M' } },
    { username: 'Heretic', text: '"AN ABSOLUTE MUST-SEE. #HereticMovie is one of the best horror movies of the year."', reactions: { likes: '94%', comments: '12', shares: '193', views: '687K' }, isAd: true },
    { username: 'nina', text: "It just doesn’t make sense. So many republicans voted democrat...", reactions: { likes: '26K', comments: '38K', shares: '435K', views: '13M' } },
  ]);
  const [newPost, setNewPost] = useState('');

  const handlePost = () => {
    if (newPost.trim()) {
      const newEntry = {
        username: 'Kleiner Garcia',
        text: newPost,
        reactions: { likes: '0', comments: '0', shares: '0', views: '0' },
      };
      setPosts([newEntry, ...posts]);
      setNewPost('');
    }
  };

  return (
    <Container fluid >

      <Row>
        {/* Barra lateral izquierda */}
        <Col md={2} className="bg-dark text-white vh-100">
          <Nav className="flex-column p-3">
            <Nav.Link className="text-white" href="#home"><FaHome /> Home</Nav.Link>
          
            <Nav.Link className="text-white" href="#notifications"><FaBell /> Notifications</Nav.Link>
            <Nav.Link className="text-white" href="#messages"><FaEnvelope /> Messages</Nav.Link>
    
            <Button variant="primary" className="mt-4">Post</Button>
          </Nav>
        </Col>

        {/* Columna principal (feed de publicaciones) */}
        <Col md={6} className=" text-light">
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

          {posts.map((post, index) => (
            <Card className="mb-3" key={index}>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="fw-bold">{post.username}</div>
                  <small className="text-muted">{post.isAd ? 'Ad' : '5h'}</small>
                </div>
                <Card.Text>{post.text}</Card.Text>
                <div className="d-flex justify-content-between text-muted">
                  <div>❤️ {post.reactions.likes}</div>
                  <div>💬 {post.reactions.comments}</div>
                  <div>🔁 {post.reactions.shares}</div>
                  <div>👀 {post.reactions.views}</div>
                </div>
              </Card.Body>
            </Card>
          ))}
        </Col>

        {/* Barra lateral derecha (tendencias y sugerencias de seguimiento) */}
        <Col md={4} className="bg-dark ">
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


