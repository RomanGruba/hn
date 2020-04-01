import React, { useState, useContext } from "react";
import FirebaseContext from "../../firebase/context";

function ForgotPassword() {
  const { firebase } = useContext(FirebaseContext);
  const [resetPasswordEmail, setResetPasswordEmail] = useState();
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const [passwordResetError, setPasswordResetError] = useState(null);

  const handleResetPassword = async () => {
    try {
      console.log(firebase);
      await firebase.resetPassword(resetPasswordEmail);
      setIsPasswordReset(true);
      setPasswordResetError(null);
    } catch (error) {
      setPasswordResetError(error.message);
      setIsPasswordReset(false);
    }
  };
  return (
    <div>
      <input
        type="email"
        className="input"
        placeholder="Provide your account email"
        onChange={e => {
          setResetPasswordEmail(e.target.value);
        }}
      />
      <div className="">
        <button className="button" onClick={handleResetPassword}>
          Reset Password
        </button>
      </div>
      {isPasswordReset && <p>Check email to reset the password!</p>}
      {passwordResetError && <p className="error-text">{passwordResetError}</p>}
    </div>
  );
}

export default ForgotPassword;
