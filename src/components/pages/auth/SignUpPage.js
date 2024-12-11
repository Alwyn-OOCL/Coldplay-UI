import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import './Auth.css';
import {register} from "../../../api/authApi";
import {useAuth} from "../../../contexts/AuthContext";

export default function SignUpPage() {

    const navigate = useNavigate();
    const {setToken} = useAuth();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        agreeToTerms: false
    });

    const [error, setError] = useState('');
    const [duplicateError, setDuplicateError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== e.target.confirmPassword.value) {
            setError('Two Passwords do not match');
            return;
        }
        register(formData).then((response) => {
            if (response.success) {
                setToken({token: response.data.token, id: response.data.id});
                // 跳到上一个页面
                navigate(-1);
            } else {
                setDuplicateError(response.errorMsg);
            }
        });
    };

    const handleChange = (e) => {
        const {name, value, type, checked} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    return (
        <div className="auth-page">
            <main className="auth-container">
                <div className="auth-card">
                    <h2>Sign Up</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                required
                            />
                            {error && <p className="error-message">{error}</p>}
                            {duplicateError && <p className="error-message">{duplicateError}</p>}
                        </div>
                        <div className="form-group checkbox">
                            <label>
                                <input
                                    type="checkbox"
                                    name="agreeToTerms"
                                    checked={formData.agreeToTerms}
                                    onChange={handleChange}
                                    required
                                />
                                <span>
              I agree to the <Link to="/terms" className="terms-link">Terms & Conditions</Link>
            </span>
                            </label>
                        </div>
                        <button type="submit" className="auth-submit signup">
                            Sign Up
                        </button>
                    </form>
                </div>
            </main>
        </div>
);
}

