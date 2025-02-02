import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { GoogleLogin } from "react-google-login";
import "./SignUp.css"; // For styling (optional)

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    verificationCode: "",
  });
  const [loading, setLoading] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    navigate("/scrapping");

    // Simulate sending email verification code to the user's email
    setTimeout(() => {
      setLoading(false);
      alert("Verification code sent to your email!");
    }, 2000);
  };

  const handleEmailVerification = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate verifying the code entered by the user
    setTimeout(() => {
      setLoading(false);
      if (formData.verificationCode === "123456") {
        setIsEmailVerified(true);
        alert("Email verified successfully!");
      } else {
        setError("Invalid verification code");
      }
    }, 2000);
  };

  const handleGoogleLoginSuccess = (response) => {
    console.log("Google login successful:", response);
    const { profileObj, tokenId } = response;

    // Here, you could save the token or profile info to your state or backend
    alert(`Welcome ${profileObj.name}, you are logged in!`);

    // Example of saving the user data (optional)
    // localStorage.setItem('userData', JSON.stringify(profileObj));
    // localStorage.setItem('token', tokenId);
  };

  const handleGoogleLoginFailure = (error) => {
    console.log("Google login failed:", error);
    setError("Google login failed. Please try again.");
  };

  return (
    <div className="container">
      <div className="top-section">
        <h1>Welcome to BeyondChats! Let’s get started.</h1>
      </div>

      {!isEmailVerified ? (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              title="Please enter a valid email"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              minLength="8"
            />
            <button type="button" onClick={handlePasswordToggle}>
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <button type="submit" disabled={loading}>
            Submit
          </button>

          <div className="google-login">
            {/* <GoogleLogin
              clientId="784390079790-srprabd0joggth5jb12963qv2co9ievo.apps.googleusercontent.com" // Replace with your actual Google Client ID
              buttonText="Continue with Google"
              onSuccess={handleGoogleLoginSuccess}
              onFailure={handleGoogleLoginFailure}
              cookiePolicy="single_host_origin" // Ensures correct cookie policy
            /> */}
          </div>
        </form>
      ) : (
        <form onSubmit={handleEmailVerification}>
          <div className="form-group">
            <label>Enter Verification Code</label>
            <input
              type="text"
              name="verificationCode"
              value={formData.verificationCode}
              onChange={handleChange}
              maxLength="6"
              placeholder="Enter 6-digit code"
              required
            />
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}

          <button type="submit" disabled={loading}>
            Verify Email & Continue
          </button>
          <button
            type="button"
            onClick={() => alert("Verification code resent.")}
          >
            Resend Code
          </button>
        </form>
      )}

      {loading && <div className="loading">Loading...</div>}
    </div>
  );
};

export default SignUp;