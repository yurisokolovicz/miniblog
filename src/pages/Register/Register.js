import { useState, useEffect } from 'react';

import styles from './Register.module.css';

const Register = () => {
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = e => {
        e.preventDefault();

        setError('');

        const user = {
            displayName,
            email,
            password,
            confirmPassword
        };
        // validation
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        console.log(user);
    };

    return (
        <div className={styles.register}>
            <h1>Registration</h1>
            <p>Create your account</p>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Name:</span>
                    <input
                        type="text"
                        name="displayName"
                        required
                        placeholder="User`s name"
                        value={displayName}
                        onChange={e => setDisplayName(e.target.value)}
                    />
                </label>
                <label>
                    <span>Email:</span>
                    <input
                        type="email"
                        name="email"
                        required
                        placeholder="User`s email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </label>
                <label>
                    <span>Password:</span>
                    <input
                        type="password"
                        name="password"
                        required
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </label>
                <label>
                    <span>Password confirmation:</span>
                    <input
                        type="password"
                        name="confirmPassword"
                        required
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                    />
                </label>
                <button className="btn">Register</button>
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    );
};

export default Register;
