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
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                        </Routes>
                    </div>
                    <Footer />
                </BrowserRouter>
            </AuthProvider>
        </div>
    );
};

export default App;
