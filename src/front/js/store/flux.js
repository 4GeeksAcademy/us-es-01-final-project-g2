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
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log("Error loading message from backend", response.status);
					return;
				}
				const data = await response.json();
				setStore({ message: data.message });
				return data;
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
					if (!response.ok) {
						throw new Error("Signup failed");
					}
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
				const response = await fetch(uri, options);
				if (!response.ok) {
					// tratar el error
					if (response.status === 401) {
						// usuario y contraseña errónea
						console.error("Error: Credenciales incorrectas.");
						return;
					}
					console.error("Error: Algo salió mal en el proceso de inicio de sesión.");
					return;
				}
				const data = await response.json();
				localStorage.setItem('token', data.access_token);
				setStore({ user: data.user.email, isLogin: true, isAdmin: data.user.is_admin });
				return data;
			},
			logout: () => {
				setStore({ user: null, isLogin: false })
			},
			addPost: async (title, content, author_id) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + '/api/posts', {
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
					const response = await fetch(process.env.BACKEND_URL + '/api/posts');
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
			addComment: async (postId, content) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/comments`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({ post_id: postId, content })
					});
					if (response.ok) {
						const comment = await response.json();
						const store = getStore();
						// Añadir el comentario al estado global
						setStore({
							comments: {
								...store.comments,
								[postId]: [...(store.comments[postId] || []), comment]
							}
						});
					} else {
						console.error("Error adding comment", response.statusText);
					}
				} catch (error) {
					console.error("Error adding comment", error);
				}
			},
			// Acción para obtener todos los comentarios de un post
			getComments: async (postId) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/comments?post_id=${postId}`);
					if (response.ok) {
						const comments = await response.json();
						const store = getStore();
						setStore({
							comments: {
								...store.comments,
								[postId]: comments
							}
						});
					} else {
						console.error("Error fetching comments", response.statusText);
					}
				} catch (error) {
					console.error("Error fetching comments", error);
				}
			}
		}
	};
};

export default getState;
