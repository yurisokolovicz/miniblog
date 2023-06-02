import { NavLink } from 'react-router-dom';
import { useAuthentication } from '../hooks/useAuthentication'; // pra fazer logout
import { useAuthValue } from '../context/AuthContext'; // context

import Logo from '../assets/logo.jpg';
import styles from './Navbar.module.css';

const Navbar = () => {
    // o user esta sendo compartilhado com todos os componentes que estão dentro do AuthProvider no App.js
    const { user } = useAuthValue();

    return (
        <nav className={styles.navbar}>
            <NavLink to="/" className={styles.brand}>
                {/* Mini <span>Blog</span> */}
                <img src={Logo} alt="Logo" />
            </NavLink>
            <ul className={styles.links_list}>
                <li>
                    <NavLink to="/" className={({ isActive }) => (isActive ? styles.active : '')}>
                        Home
                    </NavLink>
                </li>
                {!user && (
                    <>
                        <li>
                            <NavLink to="/login" className={({ isActive }) => (isActive ? styles.active : '')}>
                                Login
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/register" className={({ isActive }) => (isActive ? styles.active : '')}>
                                Register
                            </NavLink>
                        </li>
                    </>
                )}
                {user && (
                    <>
                        <li>
                            <NavLink to="/post/create" className={({ isActive }) => (isActive ? styles.active : '')}>
                                Create Post
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard" className={({ isActive }) => (isActive ? styles.active : '')}>
                                Dashboard
                            </NavLink>
                        </li>
                    </>
                )}
                <li>
                    <NavLink to="/about" className={({ isActive }) => (isActive ? styles.active : '')}>
                        About
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
