import React from 'react';
import { Link } from 'react-router-dom';
import './ErrorPages.css';

export default function ServerErrorPage() {
    return (
        <div className="error-page">
            <main className="error-content">
                <h1>500</h1>
                <h2>Server Error</h2>
                <p>Oops! Something went wrong on our end. Please try again later.</p>
                <Link to="/" className="button button-primary">
                    Back to Homepage
                </Link>
            </main>
        </div>
    );
}

