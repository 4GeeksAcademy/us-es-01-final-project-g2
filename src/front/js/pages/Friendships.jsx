import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export const Friendships = () => {
    const [data, setData] = useState({
        followers: 1,
        following: 3,
        followingStatus: {
            1: true,
            2: true,
            3: true,
        },
    });

    const toggleFollow = (id) => {
        setData((prevData) => {
            const isFollowing = prevData.followingStatus[id];
            const updatedFollowingStatus = {
                ...prevData.followingStatus,
                [id]: !isFollowing,
            };

            return {
                ...prevData,
                following: isFollowing ? prevData.following - 1 : prevData.following + 1,
                followingStatus: updatedFollowingStatus,
            };
        });
    };

    return (
        <div className="d-flex align-items-center justify-content-center vh-100 vw-100 bg-dark">
            <div
                className="profile-container text-light bg-dark p-5 rounded-3 shadow-lg"
                style={{
                    width: '100%',
                    maxWidth: '800px',
                    height: '80vh',
                    overflowY: 'auto',
                }}
            >
                <div className="profile-picture mb-4 text-center">
                    <img
                        src="https://i.ibb.co/NKvwmWZ/Dise-o-sin-t-tulo-5.png"
                        alt="Profile"
                        className="rounded-circle border border-light"
                        style={{ width: '150px', height: '150px' }}
                    />
                </div>
                <h3 className="username text-center mb-4">kleinercalle</h3>
                <div className="text-center mb-4">
                    <button className="btn btn-outline-light px-4">Edit profile</button>
                </div>
                <hr className="text-light opacity-50" />
                <div className="d-flex justify-content-between px-3 mb-4">
                    <span>{data.followers} Follower{data.followers !== 1 ? 's' : ''}</span>
                    <span>{data.following} Following</span>
                </div>
                <hr className="text-light opacity-50" />
                <div className="following-list">
                    <h5 className="mb-3">Following</h5>
                    <ul className="list-unstyled">
                        <li className="d-flex align-items-start mb-4">
                            <img
                                src="https://i.ibb.co/1nPC9D4/Dise-o-sin-t-tulo-8.png"
                                alt="User 1"
                                className="me-3 rounded-circle border border-light"
                                style={{ width: '60px', height: '60px' }}
                            />
                            <div>
                                <h6 className="mb-1">
                                    <Link
                                        to="/profile/1"
                                        className="text-decoration-none text-light"
                                    >
                                        Héctor Chocobar-Torrejón
                                    </Link>
                                </h6>
                                <p className="text-muted small mb-2">B.E. in C.S. | Mentor @4GeeksAcademy</p>
                                <button
                                    className="btn btn-outline-light btn-sm"
                                    onClick={() => toggleFollow(1)}
                                >
                                    {data.followingStatus[1] ? 'Unfollow' : 'Follow'}
                                </button>
                            </div>
                        </li>
                        <li className="d-flex align-items-start mb-4">
                            <img
                                src="https://i.ibb.co/zSqjNPD/Dise-o-sin-t-tulo-10.png"
                                alt="User 2"
                                className="me-3 rounded-circle border border-light"
                                style={{ width: '60px', height: '60px' }}
                            />
                            <div>
                                <h6 className="mb-1">
                                    <Link
                                        to="/profile/2"
                                        className="text-decoration-none text-light"
                                    >
                                        Fernando Correa
                                    </Link>
                                </h6>
                                <p className="text-muted small mb-2">Time to Code</p>
                                <button
                                    className="btn btn-outline-light btn-sm"
                                    onClick={() => toggleFollow(2)}
                                >
                                    {data.followingStatus[2] ? 'Unfollow' : 'Follow'}
                                </button>
                            </div>
                        </li>
                        <li className="d-flex align-items-start">
                            <img
                                src="https://i.ibb.co/tYc617V/Dise-o-sin-t-tulo-11.png"
                                alt="User 3"
                                className="me-3 rounded-circle border border-light"
                                style={{ width: '60px', height: '60px' }}
                            />
                            <div>
                                <h6 className="mb-1">
                                    <Link
                                        to="/profile/3"
                                        className="text-decoration-none text-light"
                                    >
                                        Alejandro Sanchez
                                    </Link>
                                </h6>
                                <p className="text-muted small mb-2">Founder of 4Geeks.com and @4GeeksAcademy</p>
                                <button
                                    className="btn btn-outline-light btn-sm"
                                    onClick={() => toggleFollow(3)}
                                >
                                    {data.followingStatus[3] ? 'Unfollow' : 'Follow'}
                                </button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
