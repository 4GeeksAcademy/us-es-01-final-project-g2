import React, { useState } from 'react';
import { FaUserFriends } from 'react-icons/fa';

export const Perfil = () => {
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <div className="container-fluid bg-dark text-light p-5" style={{ minHeight: '100vh' }}>
      <div className="container bg-dark text-light p-4 rounded shadow-lg" style={{ maxWidth: '1200px' }}>
        <div className="row">
          {/* Columna Izquierda - Perfil */}
          <div className="col-md-4 d-flex flex-column align-items-center">
            <img
              src="https://i.ibb.co/NKvwmWZ/Dise-o-sin-t-tulo-5.png" // Reemplaza esta URL con la URL de tu imagen
              alt="Perfil"
              className="rounded-circle border border-secondary mb-3"
              style={{ width: '150px', height: '150px' }}
            />
            <h3>kleinercalle</h3>
            <button className="btn btn-outline-light btn-sm mt-2">Edit profile</button>

            {/* Seguidores y siguiendo */}
            <div className="d-flex align-items-center text-muted mt-2">
              <FaUserFriends className="me-1" />
              <span className='text-secondary'>
                <strong>1</strong> follower • <strong>3</strong> following
              </span>
            </div>

            {/* Sección Friends con enlace */}
            <div className="mt-4 w-100">
              <h5>
                <a href="/friendships" className="text-light text-decoration-none">
                  Friends
                </a>
              </h5>
              <div className="d-flex">
                <img src="https://i.ibb.co/zSqjNPD/Dise-o-sin-t-tulo-10.png" alt="Achievement 1" className="rounded-circle mr-2" />
                <img src="https://i.ibb.co/tYc617V/Dise-o-sin-t-tulo-11.png" alt="Achievement 2" className="rounded-circle" />
              </div>
            </div>
          </div>

          {/* Columna Derecha - Información del perfil */}
          <div className="col-md-8">
            <div className="bg-secondary p-4 rounded mb-4">
              <h2>Hi there </h2>
              <p><strong>kleiner Garcia</strong> I am  <strong>Kleiner</strong> </p>
              <p>Here are some ideas to get you started:</p>
              <ul className="list-unstyled">
                <li> I’m currently learning ...</li>
                <li> I’m looking to collaborate on ...</li>
                <li> I’m looking for help with ...</li>
                <li>Ask me about ...</li>
                <li> How to reach me: ...</li>
                <li> Pronouns: ...</li>
                <li> Fun fact: ...</li>
              </ul>
            </div>

            <div className="bg-secondary p-4 rounded mb-4">
              <h4>Publicaciones</h4>
              <div className="bg-dark p-2 rounded text-center">
                <a href="#" className="text-light">Hola Mundo</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
