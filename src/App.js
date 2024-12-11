import { ThemeProvider } from "@mui/material/styles";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import HomePage from "./components/HomePage/HomePage";
import Navbar from "./components/Navbar/Navbar";
import LoginPage from "./components/pages/auth/LoginPage";
import SignUpPage from "./components/pages/auth/SignUpPage";
import BookingPage from "./components/pages/bookingPage/BookingPage";
import NotFoundPage from "./components/pages/NotFoundPage";
import ServerErrorPage from "./components/pages/ServerErrorPage";
import { AuthProvider } from "./contexts/AuthContext";
import darkTheme from "./theme";
import ConcertListPage from "../src/pages/ConcertListPage";
import ConcertDetail from "./components/ConcertDetail/ConcertDetail";

function App() {
  return (
    <Router>
      <ThemeProvider theme={darkTheme}>
        <AuthProvider>
          <Navbar />
          <div className="main">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/concerts" element={<ConcertListPage />} />
              <Route path="/concert/:concert_id" element={<ConcertDetail />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/server-error" element={<ServerErrorPage />} />
              <Route path="/booking/:concert_id" element={<BookingPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
          <Footer />
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
