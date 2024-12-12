import React, {
  useEffect,
  useState
} from 'react';
import { useNavigate } from 'react-router-dom';
import baseApi from '../../api/baseApi';
import logo from '../../assets/images/logo.svg';
import '../../assets/styles/global.css';
import { useAuth } from "../../contexts/AuthContext";
import './Navbar.css';

export default function Navbar () {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const { userId,clearToken} = useAuth();

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

  const handleLogout = () => {
    baseApi.post('/logout')
      .then(() => {
        clearToken();
        setUser(null);
      })
      .catch(error => {
        console.error('Error during logout:', error);
      });
  };

  return (
    <nav className='navbar'>
      <div className='container navbar-container'>
        <img src={logo} alt='Logo' onClick={handleLogoClick} style={{ height: 'auto', width: '70px' }}/>
        <div className='navbar-logo' onClick={handleLogoClick}>
          ColdplayGlobal
        </div>
        <div className='navbar-links'>
          <a href='/' className='nav-link'>Homepage</a>
          <a href='/concerts' className='nav-link'>Concerts</a>
          <a href='/my-orders' className='nav-link'>My Orders</a>
          <a href='/shop' className='nav-link'>Shop</a>
        </div>
        <div className='navbar-auth'>
          {user ? (
              <div className='user-info'>
                <div>
                  <div className='user-level'>
                    <span>Cold Rank: </span>
                    <span>{user.level}</span>
                  </div>
                  <div className='user-name'>
                    <span>Your Name: </span>
                    <span>{user.name}</span>
                  </div>
                  <div className='user-name'>
                    <span>Cold Point: </span>
                    <span>{user.point ? user.point : 0}</span>
                  </div>
                </div>
                <button className='logout-button' onClick={handleLogout}>Logout</button>
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

