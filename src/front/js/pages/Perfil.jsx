import React, { useContext, useState } from 'react';
import { FaUserFriends } from 'react-icons/fa';
import { Context } from '../store/appContext.js';
import { Link } from 'react-router-dom';

export const Perfil = () => {
  const { store} = useContext(Context);
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <div className="container-fluid bg-dark text-light p-5" style={{ minHeight: '100vh' }}>
      <div className="container bg-dark text-light p-4 rounded shadow-lg" style={{ maxWidth: '1200px' }}>
        <div className="row">
          {/* Columna Izquierda - Perfil */}
          <div className="col-md-4 d-flex flex-column align-items-center">
            <img
              src={store.user.profile_picture}
              alt={store.user.email}
              className="rounded-circle border border-secondary mb-3"
              style={{ width: '150px', height: '150px' }}
            />
            <h3>{store.user.email}</h3>
            {/* <button className="btn btn-outline-light btn-sm mt-2">Edit profile</button> */}

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
                <Link to="/friendships" className="text-light text-decoration-none">
                  Friends
                </Link>
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
              <p>{store.user.bio}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
