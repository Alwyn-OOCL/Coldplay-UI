import React, {
  useEffect,
  useState
} from 'react';
import {useNavigate} from 'react-router-dom';
import './Navbar.css';
import '../../assets/styles/global.css';
import baseApi from '../../api/baseApi';
import {useAuth} from "../../contexts/AuthContext";

export default function Navbar () {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const { userId } = useAuth();

  useEffect(() => {
    if (userId) {
      baseApi.get(`/user/${userId}`)
      .then(response => {
        setUser(response.data.data);
      })
      .finally(() => {
      });
    }
  }, [userId]);

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  const handleLogoClick = () => {
    navigate('/'); // Navigate to homepage
  };

  return (
    <nav className='navbar'>
      <div className='container navbar-container'>
        <div className='navbar-logo' onClick={handleLogoClick}>
          Coldplay World Tour <span className='logo-break'>Ticketing System</span>
        </div>
        <div className='navbar-links'>
          <a href='/' className='nav-link'>Homepage</a>
          <a href='/concerts' className='nav-link'>Concerts</a>
        </div>
        <div className='navbar-auth'>
          {user ? (
            <div className='user-info'>
              <div className='user-info'>
                <div className='user-level'>{user.level}</div>
                <div className='user-name'>{user.name}</div>
              </div>
            </div>
          ) : (
            <>
              <button className='button button-secondary' onClick={handleLogin}>Log In</button>
              <button className='button button-primary' onClick={handleSignup}>Sign Up</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

