import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHome,
    faBook,
    faTachometerAlt,
    faUserPlus,
    faSignInAlt,
    faUser,
    faSignOutAlt,
    faTimes
} from '@fortawesome/free-solid-svg-icons';
import images from "../../constants/images.js";

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        document.cookie = 'accessToken=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;';
        document.cookie = 'refreshToken=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;';
        setIsLoggedIn(false);
        navigate('/');
    };

    const checkLoggedIn = () => {
        const accessToken = document.cookie.split(';').find(cookie => cookie.trim().startsWith('accessToken='));
        setIsLoggedIn(accessToken !== undefined);
    };

    useEffect(() => {
        checkLoggedIn();
    }, []);

    const [isNavCollapsed, setIsNavCollapsed] = useState(true);

    const handleToggleNav = () => {
        setIsNavCollapsed(!isNavCollapsed);
    };


    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark d-lg-none bg-light">
                <div className="container" style={{ display: 'flex', alignItems: 'center' }}>
                    <Link to="/" className="navbar-brand">
                        <img
                            src={images.logo}
                            alt="Asset-Hub"
                            height="70"
                            className="d-inline-block align-top m-1"
                        />
                    </Link>
                    <button
                        style={{ marginLeft: 'auto', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}
                        type="button"
                        onClick={handleToggleNav}
                    >
                        <span style={{ color: 'black', fontSize: '1.5rem' }}>&#9776;</span>
                    </button>
                </div>

                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: isNavCollapsed ? '-300px' : '0',
                        width: '300px',
                        height: '100%',
                        backgroundColor: 'white',
                        colopr: 'white',
                        zIndex: '1000',
                        transition: 'left 0.3s ease-in-out',
                        overflowY: 'auto',
                    }}
                >
                    <button
                        style={{
                            position: 'absolute', top: '10px', right: '10px', backgroundColor: 'transparent', border: 'none',
                            color: 'black', fontSize: '1.5rem', cursor: 'pointer'
                        }}
                        onClick={handleToggleNav}
                    >
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                    <ul style={{ listStyle: 'none', padding: '20px' }}>
                        <li className="nav-item">
                            <Link to="/" className="nav-link" style={{ fontSize: '1.2rem', marginLeft: '30px', padding: '5px' }}>
                                <FontAwesomeIcon icon={faHome} className="me-2" />
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/about" className="nav-link" style={{ fontSize: '1.2rem', marginLeft: '30px', padding: '5px' }}>
                                <FontAwesomeIcon icon={faBook} className="me-2" />
                                About Us
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/explore" className="nav-link" style={{ fontSize: '1.2rem', marginLeft: '30px', padding: '5px' }}>
                                <FontAwesomeIcon icon={faTachometerAlt} className="me-2" />
                                Explore
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/dashboard" className="nav-link" style={{ fontSize: '1.2rem', marginLeft: '30px', padding: '5px' }}>
                                <FontAwesomeIcon icon={faUser} className="me-2" />
                                Dashboard
                            </Link>
                        </li>
                        {isLoggedIn ? (
                            <>
                                <li className="nav-item">
                                    <Link to="/profile" className="nav-link" style={{ fontSize: '1.2rem', marginLeft: '30px', padding: '5px' }}>
                                        <FontAwesomeIcon icon={faUser} className="me-2" />
                                        Profile
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link btn btn-link" onClick={handleLogout} style={{ fontSize: '1.2rem', marginLeft: '30px', padding: '5px' }}>
                                        <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link to="/auth/signin" className="nav-link" style={{ fontSize: '1.2rem', marginLeft: '30px', padding: '5px' }}>
                                        <FontAwesomeIcon icon={faSignInAlt} className="me-2" />
                                        Login
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/auth/signup" className="nav-link" style={{ fontSize: '1.2rem', marginLeft: '30px', padding: '5px' }}>
                                        <FontAwesomeIcon icon={faUserPlus} className="me-2" />
                                        Register
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
                <div
                    style={{
                        display: isNavCollapsed ? 'none' : 'block',
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'rgba(0, 0, 0, 0.5)',
                        zIndex: '999',
                    }}
                    onClick={handleToggleNav}
                ></div>
            </nav>

            <nav className="navbar navbar-expand-lg navbar-light d-none d-lg-block bg-light">
                <div className="container">
                    <Link to="/" className="navbar-brand">
                        <img
                            src={images.logo}
                            alt="Asset-Hub"
                            height="70"
                            className="d-inline-block align-top m-1"
                        />
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-lg-end" id="navbarNav">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link to="/" className="nav-link" style={{ fontSize: '1.2rem', marginRight: '15px' }}>
                                    <FontAwesomeIcon icon={faHome} className="me-2" />
                                    Home
                                </Link>
                            </li>
                            {isLoggedIn ? (
                                <>
                                    <li className="nav-item">
                                        <Link to="/about" className="nav-link" style={{ fontSize: '1.2rem', marginRight: '15px' }}>
                                            <FontAwesomeIcon icon={faBook} className="me-2" />
                                            About Us
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/explore" className="nav-link" style={{ fontSize: '1.2rem', marginRight: '15px' }}>
                                            <FontAwesomeIcon icon={faTachometerAlt} className="me-2" />
                                            Explore
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/dashboard" className="nav-link" style={{ fontSize: '1.2rem', marginRight: '15px' }}>
                                            <FontAwesomeIcon icon={faUser} className="me-2" />
                                            Dashboard
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/profile" className="nav-link" style={{ fontSize: '1.2rem', marginRight: '15px' }}>
                                            <FontAwesomeIcon icon={faUser} className="me-2" />
                                            Profile
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <button className="nav-link btn btn-link" onClick={handleLogout} style={{ fontSize: '1.2rem', marginRight: '15px' }}>
                                            <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
                                            Logout
                                        </button>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <Link to="/auth/signin" className="nav-link" style={{ fontSize: '1.2rem', marginRight: '15px' }}>
                                            <FontAwesomeIcon icon={faSignInAlt} className="me-2" />
                                            Login
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/auth/signup" className="nav-link" style={{ fontSize: '1.2rem', marginRight: '15px' }}>
                                            <FontAwesomeIcon icon={faUserPlus} className="me-2" />
                                            Register
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
