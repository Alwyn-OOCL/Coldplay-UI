import Footer from "./components/Footer/Footer";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import "./App.css";
import HomePage from "./components/HomePage/HomePage";
import Navbar from './components/Navbar/Navbar';
import {AuthProvider} from "./contexts/AuthContext";
import LoginPage from "./components/pages/auth/LoginPage";
import SignUpPage from "./components/pages/auth/SignUpPage";
import NotFoundPage from "./components/pages/NotFoundPage";
import ServerErrorPage from "./components/pages/ServerErrorPage";
import ConcertDetail from "./components/ConcertDetail/ConcertDetail";

function App() {
    return (
        <Router>
            <AuthProvider>
                <Navbar/>
                <div className="main">
                    <Routes>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="/login" element={<LoginPage/>}/>
                        <Route path="/signup" element={<SignUpPage/>}/>
                        <Route path="/server-error" element={<ServerErrorPage />} />
                        <Route path="/concert/:id" element={<ConcertDetail />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </div>
                <Footer/>
            </AuthProvider>
        </Router>
    );
}

export default App;
