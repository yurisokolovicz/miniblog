import { useState, useEffect } from 'react';

import styles from './Register.module.css';

const Register = () => {
    return (
        <>
            <h1>Registration</h1>
            <p>Create your account</p>
            <form>
                <label>
                    <span>Name:</span>
                    <input type="text" name="displayName" required placeholder="User`s name" />
                </label>
                <label>
                    <span>Email:</span>
                    <input type="email" name="email" required placeholder="User`s email" />
                </label>
                <label>
                    <span>Password:</span>
                    <input type="password" name="password" required placeholder="Password" />
                </label>
                <label>
                    <span>Password confirmation:</span>
                    <input type="password" name="confirmPassword" required placeholder="Confirm your password" />
                </label>
                <button className="btn">Register</button>
            </form>
        </>
    );
};

export default Register;
