import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import './Auth.css';
import {useAuth} from "../../../contexts/AuthContext";
import Footer from "../../Footer/Footer";
import {login} from "../../../api/authApi";

export default function LoginPage() {
    const navigate = useNavigate();

    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const {setToken} = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        login(credential, password).then((response) => {
            console.log(response);
            if (response.success) {
                setToken(response.data);
                navigate('/');
            } else {
                setError(response.errorMsg);
            }
        });

    };

    return (
        <div className="auth-page">
            <main className="auth-container">
                <div className="auth-card">
                    <h2>Log In</h2>
                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="Email / Username"
                                value={credential}
                                onChange={(e) => setCredential(e.target.value)}
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
                            {error && <p className="error-message">{error}</p>}
                        </div>
                        <button type="submit" className="auth-button login-button">
                            Log In
                        </button>
                    </form>
                    <p className="auth-switch">
                        Don't have an account? <Link to="/signup">Sign up</Link>
                    </p>
                </div>
            </main>
            <Footer/>
        </div>
    );
}

