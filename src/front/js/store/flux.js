const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            demo: [
                { title: "FIRST", background: "white", initial: "white" },
                { title: "SECOND", background: "white", initial: "white" }
            ],
            message: null,
            user: null, // Estado para guardar datos del usuario
            isLogin: false, // Estado para saber si el usuario está logueado
            comments: [], // Estado para almacenar los comentarios por post
            host: 'https://playground.4geeks.com/contact'
        },
        actions: {
            exampleFunction: () => {
                getActions().changeColor(0, "green");
            },
            getMessage: async () => {
                const uri = `${process.env.BACKEND_URL}/api/hello`;
                const options = {
                    method: 'GET'
                };
                try {
                    const response = await fetch(uri, options);
                    if (!response.ok) throw new Error("Error loading message from backend");

                    const data = await response.json();
                    setStore({ message: data.message });
                    return data;
                } catch (error) {
                    console.log(error.message);
                }
            },
            changeColor: (index, color) => {
                const store = getStore();
                const demo = store.demo.map((element, i) => {
                    if (i === index) element.background = color;
                    return element;
                });
                setStore({ demo: demo });
            },
            // Acción de registro
            signup: async (email, password) => {
                const uri = `${process.env.BACKEND_URL}/api/signup`;
                const options = {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email, password })
                };

                try {
                    const response = await fetch(uri, options);
                    if (!response.ok) throw new Error("Signup failed");

                    const data = await response.json();
                    console.log("User signed up:", data);

                    // Guardar el token y datos del usuario en el almacenamiento local o en el estado global
                    localStorage.setItem("user", JSON.stringify(data.user));
                    localStorage.setItem("token", data.access_token);

                    // Actualizar el estado global con el usuario registrado y el token
                    setStore({ user: data.user, isLogin: true });
                    return data;
                } catch (error) {
                    console.error("Error during signup:", error);
                }
            },
            // Acción de inicio de sesión
            login: async (dataToSend) => {
                const uri = `${process.env.BACKEND_URL}/api/login`;
                const options = {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(dataToSend)
                };
                try {
                    const response = await fetch(uri, options);
                    if (!response.ok) {
                        if (response.status === 401) {
                            console.error("Error: Credenciales incorrectas.");
                        } else {
                            console.error("Error: Algo salió mal en el proceso de inicio de sesión.");
                        }
                        return;
                    }
                    const data = await response.json();
                    localStorage.setItem('token', data.access_token);
                    setStore({ user: data.user.email, isLogin: true, isAdmin: data.user.is_admin });
                    return data;
                } catch (error) {
                    console.error("Error during login:", error);
                }
            },
            logout: () => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                setStore({ user: null, isLogin: false });
            },
            addPost: async (title, content, author_id) => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/posts`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ title, content, author_id })
                    });
                    if (response.ok) {
                        const newPost = await response.json();
                        return newPost;
                    } else {
                        console.error("Error creating post", response.statusText);
                    }
                } catch (error) {
                    console.error("Error creating post", error);
                }
            },
            getPosts: async () => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/posts`);
                    if (response.ok) {
                        const posts = await response.json();
                        return posts;
                    } else {
                        console.error("Error fetching posts", response.statusText);
                    }
                } catch (error) {
                    console.error("Error fetching posts", error);
                }
            },
            addComment: async (postId, content, author_id) => {
                try {
                  const response = await fetch(`${process.env.BACKEND_URL}/api/comments`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ post_id: postId, content, author_id })
                  });
              
                  if (!response.ok) throw new Error("Error adding comment");
              
                  const newComment = await response.json();
                  const store = getStore();
              
                  // Actualizamos el estado global con el nuevo comentario
                  setStore({
                    comments: {
                      ...store.comments,
                      [postId]: [...(store.comments[postId] || []), newComment]
                    }
                  });
              
                  return newComment;
                } catch (error) {
                  console.error("Error adding comment:", error);
                }
              },
            // Acción para obtener comentarios de un post
            getComments: async (postId) => {
                const uri = `${process.env.BACKEND_URL}/api/comments/${postId}`;
                try {
                  const response = await fetch(uri);
              
                  if (!response.ok) throw new Error("Error fetching comments");
              
                  const comments = await response.json();
                  const store = getStore();
              
                  // Actualizamos el estado con los comentarios obtenidos
                  setStore({
                    comments: {
                      ...store.comments,
                      [postId]: comments // Asumiendo que el backend devuelve un array de comentarios
                    }
                  });
              
                  return comments;
                } catch (error) {
                  console.error("Error fetching comments:", error);
                }
              }
        }
    };
};

export default getState;
