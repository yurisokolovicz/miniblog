import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // context
import { onAuthStateChanged } from 'firebase/auth'; // mapeia se o usuário está logado ou não.
import { useState, useEffect } from 'react'; // hook
import { useAuthentication } from './hooks/useAuthentication'; // custom hook

import Home from './pages/Home/Home';
import About from './pages/About/About';
import Navbar from './components/Navbar'; // above the container
import Footer from './components/Footer'; // below the container
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import CreatePost from './pages/CreatePost/CreatePost';
import Search from './pages/Search/Search';
import './App.css';

const App = () => {
    const [user, setUser] = useState(undefined);
    const { auth } = useAuthentication();

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            setUser(user);
        });
    }, [auth]);

    const loadingUser = user === undefined;
    if (loadingUser) {
        return <p>Loading...</p>;
    }

    return (
        <div className="App">
            <AuthProvider value={{ user }}>
                <BrowserRouter>
                    <Navbar />
                    <div className="container">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/search" element={<Search />} />
                            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
                            <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
                            <Route path="post/create" element={user ? <CreatePost /> : <Navigate to="/login" />} />
                            <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
                        </Routes>
                    </div>
                    <Footer />
                </BrowserRouter>
            </AuthProvider>
        </div>
    );
};

export default App;
