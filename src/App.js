import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./components/HomePage/HomePage";

function App() {
  return (
    <Router>
      <Header />
      <div className="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
