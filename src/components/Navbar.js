import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuthentication } from '../hooks/useAuthentication'; // pra fazer logout
import { useAuthValue } from '../context/AuthContext'; // context

import { FaBars } from 'react-icons/fa'; // react icons
import Logo from '../assets/logo.jpg';
// import styles from './Navbar.module.css';
import './Navbar.css';

const Navbar = () => {
    // o user esta sendo compartilhado com todos os componentes que estão dentro do AuthProvider no App.js
    const { user } = useAuthValue();
    const { logout } = useAuthentication(); // importando a função logout do custom hook useAuthentication.

    const [showLinks, setShowLinks] = useState(false);

    const handleClickHambuguer = () => {
        setShowLinks(!showLinks);
    };

    return (
        <nav className="navbar">
            <div className="leftSide">
                <NavLink to="/" className="brand">
                    <img className="logo_img" src={Logo} alt="Logo" />
                </NavLink>
            </div>
            <div className="middleSide">
                <div className="links">
                    <ul className="links_list" id={showLinks ? 'hidden' : ''}>
                        <li>
                            <NavLink to="/" onClick={handleClickHambuguer}>
                                Home
                            </NavLink>
                        </li>
                        {!user && (
                            <>
                                <li>
                                    <NavLink to="/login" onClick={handleClickHambuguer}>
                                        Login
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/register" onClick={handleClickHambuguer}>
                                        Register
                                    </NavLink>
                                </li>
                            </>
                        )}
                        {user && (
                            <>
                                <li>
                                    <NavLink to="/post/create" onClick={handleClickHambuguer}>
                                        Publish
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard" onClick={handleClickHambuguer}>
                                        Dashboard
                                    </NavLink>
                                </li>
                            </>
                        )}
                        <li>
                            <NavLink to="/about" onClick={handleClickHambuguer}>
                                About
                            </NavLink>
                        </li>
                        {user && (
                            <li>
                                <button
                                    onClick={() => {
                                        handleClickHambuguer();
                                        logout();
                                    }}
                                >
                                    Logout
                                </button>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
            <div className="rightSide">
                <div className="links">
                    <button onClick={() => setShowLinks(!showLinks)}>
                        <FaBars />
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
