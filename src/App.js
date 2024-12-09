import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import darkTheme from './theme';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import HomePage from './components/HomePage/HomePage';
import BookingPage from './components/pages/bookingPage/BookingPage';
import './App.css';
import { Box } from '@mui/material';

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Router>
        <Header />
        <Box sx={{ backgroundColor: 'black'}}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/booking/:concert_id" element={<BookingPage />} />
          </Routes>
        </Box>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
