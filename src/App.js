import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./styles/global.css";
import "./App.css";
import HomePage from "./components/HomePage/HomePage";
import ConcertDetail from "./components/ConcertDetail/ConcertDetail";

function App() {
  return (
    <Router>
      <Header />
      <div className="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/concert/:id" element={<ConcertDetail />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
