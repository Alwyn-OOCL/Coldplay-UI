import React, {
  useState,
  useEffect
} from 'react';
import {useNavigate} from 'react-router-dom';
import './Promotion.css';
import baseApi from '../../../api/baseApi';

const Promotion = ({
                     promoMessage,
                     promoDescription
                   }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [code, setCode] = useState('');
  const [isRedeemed, setIsRedeemed] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % 4);
      }, 6000); // Change image every 6 seconds

      return () => clearInterval(interval);
    }
  }, [isHovered]);

  const handleMouseEnter = (index) => {
    setIsHovered(true);
    setCurrentIndex(index);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleRedeem = () => {
    setShowAlert(true);
  };

  const handleConfirmRedeem = async () => {
    try {
      const response = await baseApi.post('/code/validation', {code});
      if (response.data.success) {
        setAlertMessage('Redemption successful!');
        setIsRedeemed(true);
        setIsError(false);
      }
      else {
        setAlertMessage(response.data.errorMsg);
        setIsError(true);
      }
    }
    catch (error) {
      setAlertMessage('Failed to redeem promotion.');
      setIsError(true);
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
    navigate('/');
  };

  return (
    <div className='promotion'>
      <h2 className='promotion-main-title'>Recently organized charity activities</h2>
      <div className='promotion-images'>
        {[
          0,
          1,
          2,
          3
        ].map((index) => (
          <div
            key={index}
            className={`promotion-image-item ${currentIndex === index ? 'active' : ''}`}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <img src={require(`../../../assets/images/homeposter.png`)} className='promotion-image' alt='Promotion'/>
            <p className='promotion-description'>{index + 1}</p>
          </div>
        ))}
      </div>
      <div className='promotion-lower'>
        <div className='promo-message'>
          <p>111{promoMessage}</p>
          <p className='promo-description'>{promoDescription}</p>
        </div>

      </div>
      <div className='redemption-box'>
        <input
          type='text'
          placeholder='Enter Redemption code'
          className='redemption-input'
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button className='redeem-button' onClick={handleRedeem}>
          Redeem
        </button>
      </div>
      {showAlert && (
        <div className='alert-box'>
          <div className='alert-content'>
            <div className='alert-header'>
            <h3>
              Confirm your Redemption code
            </h3>
            <button className="alert-close" >
              &times;
            </button>
            </div>
            {!isRedeemed && (
              <button className='confirm-button' onClick={handleConfirmRedeem}>
                Confirm
              </button>
            )}
            <button className='close-button' onClick={handleCloseAlert}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Promotion;