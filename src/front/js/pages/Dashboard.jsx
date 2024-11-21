import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Nav, Card, Button, Form, InputGroup } from "react-bootstrap";
import { FaHome, FaComment } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.js";

export const Dashboard = () => {
  const { store, actions } = useContext(Context);
  const [posts, setPosts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [comments, setComments] = useState({}); // { postId: [comments] }
  const [following, setFollowing] = useState([]); // Estado de usuarios seguidos

  const whoToFollow = [
    { id: 1, name: "Samir Makwana" },
    { id: 2, name: "Rivers Cuomo" },
    { id: 3, name: "Jane Doe" },
  ];

  useEffect(() => {
    loadPosts();
  }, []);

  // Carga las publicaciones desde el backend
  const loadPosts = async () => {
    const fetchedPosts = await actions.getPosts();
    if (fetchedPosts) {
      setPosts(fetchedPosts);

      // Inicializa los comentarios para cada publicación
      const initialComments = fetchedPosts.reduce((acc, post) => {
        acc[post.id] = post.comments || [];
        return acc;
      }, {});
      setComments(initialComments);
    }
  };

  // Maneja la creación de un nuevo post
  const handlePost = async () => {
    if (newPost.trim()) {
      const author_id = 1; // Cambia según el usuario autenticado
      const newPostEntry = await actions.addPost("New Post Title", newPost, author_id);
      if (newPostEntry) {
        setPosts([newPostEntry, ...posts]);
        setNewPost("");
      }
    }
  };

  // Maneja la creación de un nuevo comentario
  const handleComment = async (postId, commentText) => {
    if (commentText.trim()) {
      const author_id = 1; // Cambia según el usuario autenticado
      try {
        const newComment = await actions.addComment(postId, commentText, author_id);
        if (newComment) {
          setComments((prevComments) => ({
            ...prevComments,
            [postId]: [...(prevComments[postId] || []), newComment],
          }));
        }
      } catch (error) {
        console.error("Error al añadir el comentario:", error);
      }
    }
  };

  // Maneja seguir o dejar de seguir
  const toggleFollow = (userId) => {
    setFollowing((prevFollowing) =>
      prevFollowing.includes(userId)
        ? prevFollowing.filter((id) => id !== userId) // Dejar de seguir
        : [...prevFollowing, userId] // Seguir
    );
  };

  return (
    <Container fluid className="bg-dark">
      <Row>
        {/* Barra lateral izquierda */}
        <Col md={2} className="bg-dark text-white ">
          <Nav className="flex-column p-3">
            <Nav.Link className="text-white" href="#home">
              <FaHome /> Home
            </Nav.Link>
            <Link to="/friendships">
              <Button variant="secondary" className="mt-4">Friendships</Button>
            </Link>
          </Nav>
        </Col>

        {/* Columna principal (feed de publicaciones) */}
        <Col md={9} className="text-light">
          <Card className="mb-3 p-3">
            <InputGroup>
              <Form.Control
                as="textarea"
                placeholder="What is happening?!"
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
              />
              <Button onClick={handlePost} variant="primary">
                Post
              </Button>
            </InputGroup>
          </Card>

          {posts.map((post) => (
            <Card className="mb-3" key={post.id}>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="fw-bold">{post.author_name}</div>
                  <small className="text-muted">
                    {new Date(post.created_at).toLocaleString()}
                  </small>
                </div>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>{post.content}</Card.Text>
                <div className="d-flex justify-content-between text-muted">
                  <div>
                    <FaComment /> {comments[post.id]?.length || 0}
                  </div>
                </div>
                {/* Sección de Comentarios */}
                <div className="mt-3">
                  <Form.Group controlId={`comment-${post.id}`}>
                    <Form.Control
                      type="text"
                      placeholder="Write a comment..."
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleComment(post.id, e.target.value);
                          e.target.value = "";
                        }
                      }}
                    />
                  </Form.Group>
                  {comments[post.id]?.map((comment, index) => (
                    <Card.Text key={index} className="text-muted  ms-3">
                      - {comment.content}
                    </Card.Text>
                  ))}
                </div>
              </Card.Body>
            </Card>
          ))}
        </Col>

        {/* Barra lateral derecha */}
         {/*  
        <Col md={4} className="bg-dark vh-100">
         <Card className="mb-3">
            <Card.Body>
              <Card.Title>Who to follow</Card.Title>
              <ul className="list-unstyled">
                {whoToFollow.map((user) => (
                  <li key={user.id} className="d-flex justify-content-between align-items-center mb-2">
                    <span>{user.name}</span>
                    <Button
                      variant={following.includes(user.id) ? "danger" : "outline-primary"}
                      size="sm"
                      onClick={() => toggleFollow(user.id)}
                    >
                      {following.includes(user.id) ? "Unfollow" : "Follow"}
                    </Button>
                  </li>
                ))}
              </ul>
            </Card.Body>
          </Card> 
        </Col>
          */}
      </Row>
    </Container>
  );
};


/*  
comments = {
  "post1": [ 
    {... comentario 1 ...},
    {... comentario 2 ...},
    {... comentario 3 ...},
    {... comentario 4 ...}
  ],
  "post2": [
    {... comentario 1 ...},
    {... comentario 2 ...},
    {... comentario 3 ...},
    {... comentario 4 ...}
  ],
  "post3": [
    {... comentario 1 ...},
    {... comentario 2 ...},
    {... comentario 3 ...},
    {... comentario 4 ...}
  ],
}







*/