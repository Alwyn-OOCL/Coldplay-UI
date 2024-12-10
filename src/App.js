import Footer from "./components/Footer/Footer";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import "./App.css";
import HomePage from "./components/HomePage/HomePage";
import Navbar from './components/Navbar/Navbar';
import {AuthProvider} from "./contexts/AuthContext";
import LoginPage from "./components/pages/auth/LoginPage";
import SignUpPage from "./components/pages/auth/SignUpPage";

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
                    </Routes>
                </div>
                <Footer/>
            </AuthProvider>
        </Router>
    );
}

export default App;
