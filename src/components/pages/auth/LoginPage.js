import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import './Auth.css';
import {useAuth} from "../../../contexts/AuthContext";
import Footer from "../../Footer/Footer";
import {login} from "../../../api/authApi";

export default function LoginPage() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setToken } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            login(email, password).then((response) => {
                setToken(response.data);
            }).finally(() => {
                navigate('/');
            });
        } catch (error) {
            // Handle error (show error message)
        }
    };

    return (
        <div className="auth-page">
            <main className="auth-container">
                <div className="auth-card">
                    <h2>Log In</h2>
                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="form-group">
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <Link to="/forgot-password" className="forgot-password">
                            Forgot Password?
                        </Link>
                        <button type="submit" className="auth-button login-button">
                            Log In
                        </button>
                    </form>
                    <p className="auth-switch">
                        Don't have an account? <Link to="/signup">Sign up</Link>
                    </p>
                </div>
            </main>
            <Footer />
        </div>
    );
}

