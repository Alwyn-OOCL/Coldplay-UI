import React, {useState} from "react";
import "./PromotionConfirm.css";
import {charity} from "../../../api/pages/charityApi";
import {FaCheck} from "react-icons/fa";

const PromotionConfirm = (props) => {
  const [error, setError] = useState("");

  const [success, setSuccess] = useState(false);

  const { code,
          onCloseAlert,
          setCode
        } = props;

  const handleConfirmRedeem = () => {
    if (!code) {
      setError("Redemption code cannot be empty.");
    }
    else {
      setError("");
      // Proceed with redeem confirmation
    }
  };

  const handleCloseAlert = () => {
    if (onCloseAlert) {
      onCloseAlert();
    }
  };

  const handleInputChange = (event) => {
    if (setCode) {
      setCode(event.target.value);
    }
    if (event.target.value) {
      setError("");
    }
  };

  const handleCodeSubmit = () => {
    if (!code || code === "") {
      return;
    }
    handleConfirmRedeem();
    charity(code).then((response) => {
      if (response.success) {
        setSuccess(true)
      }
      else {
        setError(response.errorMsg)
      }
    });
  };

  return (
    <div className='alert-box'>
      <div className='alert-header'>
        <h3>Confirm your Redemption code</h3>
        <button className='alert-close' onClick={handleCloseAlert}>
          &times;
        </button>
      </div>
      {success ? (
        <div className='exchange-success'>
          <FaCheck size={50} color='green'/>
          <p>Redeem Successful!</p>
        </div>
      ) : (
        <div className='alert-content'>
          <p>Please confirm your redemption code to proceed.</p>
          <input type='text' value={code} onChange={handleInputChange}/>
          {error && <p className='error-message'>{error}</p>}
        </div>
      )}
      <div className='alert-actions'>
        {!success && (
          <button className='confirm-button' onClick={handleCodeSubmit}>
            Confirm
          </button>
        )}
        <button className='close-button' onClick={handleCloseAlert}>
          Close
        </button>
      </div>
    </div>
  );
};

export default PromotionConfirm;
