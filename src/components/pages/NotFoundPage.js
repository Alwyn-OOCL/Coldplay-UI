import React from 'react';
import { Link } from 'react-router-dom';
import './ErrorPages.css';

export default function NotFoundPage() {
    return (
        <div className="error-page">
            <main className="error-content">
                <h1>404</h1>
                <h2>Page Not Found</h2>
                <p>Oops! The page you're looking for doesn't exist.</p>
                <Link to="/" className="button button-primary">
                    Back to Homepage
                </Link>
            </main>
        </div>
    );
}

