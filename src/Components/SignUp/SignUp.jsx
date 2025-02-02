import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
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
            <GoogleLogin
              clientId="784390079790-srprabd0joggth5jb12963qv2co9ievo.apps.googleusercontent.com" // Replace with your actual Google Client ID
              buttonText="Continue with Google"
              onSuccess={handleGoogleLoginSuccess}
              onFailure={handleGoogleLoginFailure}
              cookiePolicy="single_host_origin" // Ensures correct cookie policy
            />
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

// Scrapping

// import React, { useState, useEffect } from "react";

// // Helper function to simulate scraping
// const fetchWebsiteMetaDescription = async (url) => {
//   // Simulate network delay
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       // Mock meta description fetched from a website
//       resolve("This is a mock meta description fetched from the website.");
//     }, 2000);
//   });
// };

// const App = () => {
//   const [companyName, setCompanyName] = useState("");
//   const [companyWebsite, setCompanyWebsite] = useState("");
//   const [metaDescription, setMetaDescription] = useState("");
//   const [scrapingStatus, setScrapingStatus] = useState(""); // 'pending', 'completed', 'error'
//   const [webPages, setWebPages] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isScrapingInProgress, setIsScrapingInProgress] = useState(false);

//   useEffect(() => {
//     if (companyWebsite) {
//       fetchMetaDescription(companyWebsite);
//     }
//   }, [companyWebsite]);

//   // Simulate scraping the website and extracting meta description
//   const fetchMetaDescription = async (url) => {
//     setIsLoading(true);
//     setScrapingStatus("pending");
//     try {
//       const description = await fetchWebsiteMetaDescription(url);
//       setMetaDescription(description);
//       setScrapingStatus("completed");
//       setIsLoading(false);
//     } catch (error) {
//       setScrapingStatus("error");
//       setIsLoading(false);
//     }
//   };

//   // Simulate scraping multiple pages of the website
//   const fetchWebPages = async () => {
//     setIsScrapingInProgress(true);
//     setWebPages([
//       { url: "/home", status: "pending" },
//       { url: "/about", status: "pending" },
//       { url: "/contact", status: "pending" },
//     ]);

//     setTimeout(() => {
//       setWebPages((prevPages) =>
//         prevPages.map((page) =>
//           page.status === "pending" ? { ...page, status: "scraped" } : page
//         )
//       );
//       setIsScrapingInProgress(false);
//     }, 3000);
//   };

//   // Handle webpage click to show scraped data (mock)
//   const handleWebPageClick = (pageUrl) => {
//     alert(`Showing content for ${pageUrl}`);
//     // Here, you can show the modal with detailed scraped data
//   };

//   // Enable the "Proceed to Next Step" button when scraping is done
//   const isProceedDisabled =
//     scrapingStatus !== "completed" || isScrapingInProgress;

//   return (
//     <div className="container">
//       <div className="top-section">
//         <h1>Let’s set up your company information.</h1>
//       </div>

//       <form>
//         <div className="form-group">
//           <label>Company Name</label>
//           <input
//             type="text"
//             value={companyName}
//             onChange={(e) => setCompanyName(e.target.value)}
//             placeholder="Enter your company name"
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label>Company Website URL</label>
//           <div className="url-container">
//             <input
//               type="url"
//               value={companyWebsite}
//               onChange={(e) => setCompanyWebsite(e.target.value)}
//               placeholder="Enter your company website URL"
//               required
//             />
//             {isLoading && <span className="loader">Loading...</span>}
//           </div>
//           {scrapingStatus === "completed" && (
//             <small>
//               Meta description successfully fetched from your website.
//             </small>
//           )}
//         </div>

//         <div className="form-group">
//           <label>Company Description</label>
//           <textarea
//             value={metaDescription}
//             onChange={(e) => setMetaDescription(e.target.value)}
//             rows="4"
//             placeholder="Enter or edit your company description"
//             required
//           />
//         </div>

//         <div className="scraping-status">
//           <h3>Scraped Webpages</h3>
//           <button
//             type="button"
//             onClick={fetchWebPages}
//             disabled={isScrapingInProgress}
//           >
//             {isScrapingInProgress
//               ? "Scraping in Progress..."
//               : "Start Scraping Website"}
//           </button>
//           <table>
//             <thead>
//               <tr>
//                 <th>Page URL</th>
//                 <th>Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {webPages.map((page, index) => (
//                 <tr key={index}>
//                   <td>{page.url}</td>
//                   <td>
//                     <span>{page.status}</span>
//                     <button
//                       type="button"
//                       onClick={() => handleWebPageClick(page.url)}
//                     >
//                       View Data
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         <button type="submit" disabled={isProceedDisabled}>
//           Proceed to Next Step
//         </button>
//       </form>
//     </div>
//   );
// };

// export default App;

// // ChatBot

// import React, { useState } from "react";
// // import "./../../App.css";

// // Dummy component for chatbot testing modal
// const TestChatbotModal = ({ isOpen, onClose }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="modal-overlay">
//       <div className="modal">
//         <div className="chatbot-container">
//           <div className="chatbot">
//             <div className="chatbot-header">Chatbot</div>
//             <div className="chatbot-content">
//               <p>Chatbot not working as intended? Share feedback.</p>
//             </div>
//             <form className="feedback-form">
//               <textarea placeholder="Enter your feedback..." rows="4" />
//               <button type="submit">Submit Feedback</button>
//             </form>
//           </div>
//         </div>
//         <button onClick={onClose} className="close-button">
//           Close
//         </button>
//       </div>
//     </div>
//   );
// };

// // Instructions with Code Snippets
// const IntegrationInstructions = () => {
//   return (
//     <div className="instructions">
//       <h3>Easy-to-Follow Instructions</h3>
//       <p>
//         Follow these simple steps to integrate the chatbot into your website:
//       </p>
//       <div className="instruction-step">
//         <h4>Step 1: Add the following script tag to your website:</h4>
//         <pre>
//           <code>{`<script src="chatbot-script.js"></script>`}</code>
//         </pre>
//       </div>
//       <div className="instruction-step">
//         <h4>Step 2: Place the chatbot div in your HTML:</h4>
//         <pre>
//           <code>{`<div id="chatbot"></div>`}</code>
//         </pre>
//       </div>
//     </div>
//   );
// };

// // Email Developer Form
// const SendToDeveloper = () => {
//   const [email, setEmail] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert(`Email sent to developer at ${email}`);
//   };

//   return (
//     <div className="developer-form">
//       <h3>Send Instructions to Developer</h3>
//       <form onSubmit={handleSubmit}>
//         <label>Email address</label>
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Enter developer's email"
//           required
//         />
//         <button type="submit">Send Email</button>
//       </form>
//     </div>
//   );
// };

// // Integration Success Screen (with confetti)
// const IntegrationSuccess = () => {
//   return (
//     <div className="success-screen">
//       <h2>Integration Successful!</h2>
//       <div className="confetti"></div>
//       <div className="post-success-actions">
//         <button>Explore Admin Panel</button>
//         <button>Start Talking to Your Chatbot</button>
//         <div className="social-share">
//           <button>Share on Twitter</button>
//           <button>Share on LinkedIn</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Integration Error Screen
// const IntegrationError = ({ onRetry }) => {
//   return (
//     <div className="error-screen">
//       <h2>Integration not detected yet</h2>
//       <p>Please check the code on your website or contact support.</p>
//       <button onClick={onRetry}>Re-test Integration</button>
//       <button>Contact Support</button>
//     </div>
//   );
// };

// const App = () => {
//   const [isChatbotModalOpen, setIsChatbotModalOpen] = useState(false);
//   const [integrationStatus, setIntegrationStatus] = useState(""); // success, error, or in-progress
//   const [step, setStep] = useState(1);

//   const handleTestChatbot = () => {
//     setIsChatbotModalOpen(true);
//   };

//   const handleCloseChatbotModal = () => {
//     setIsChatbotModalOpen(false);
//   };

//   const handleRetryIntegration = () => {
//     setIntegrationStatus(""); // Reset status for re-test
//     setStep(4); // Go to the step where integration can be retried
//   };

//   const handleNextStep = () => {
//     setStep(step + 1);
//   };

//   const handlePreviousStep = () => {
//     setStep(step - 1);
//   };

//   return (
//     <div className="app">
//       <div className="progress-bar">
//         <span>Step {step} of 5</span>
//       </div>

//       <div className="title">
//         <h1>Test & Integrate Your Chatbot</h1>
//       </div>

//       {step === 1 && (
//         <div className="test-chatbot">
//           <button onClick={handleTestChatbot}>Test Chatbot</button>
//         </div>
//       )}

//       {step === 2 && (
//         <div className="integrate-options">
//           <button onClick={handleNextStep}>Easy-to-Follow Instructions</button>
//           <button onClick={handleNextStep}>
//             Send Instructions to Developer
//           </button>
//         </div>
//       )}

//       {step === 3 && (
//         <div className="integration-test">
//           <button onClick={handleNextStep}>Test Integration</button>
//         </div>
//       )}

//       {step === 4 && integrationStatus === "success" && <IntegrationSuccess />}
//       {step === 4 && integrationStatus === "error" && (
//         <IntegrationError onRetry={handleRetryIntegration} />
//       )}
//       {step === 5 && (
//         <div className="final-success">
//           <h2>Final Step: Complete!</h2>
//           <button>Start Chatbot</button>
//         </div>
//       )}

//       <TestChatbotModal
//         isOpen={isChatbotModalOpen}
//         onClose={handleCloseChatbotModal}
//       />

//       <div className="navigation">
//         {step > 1 && <button onClick={handlePreviousStep}>Back</button>}
//         {step < 5 && <button onClick={handleNextStep}>Next</button>}
//       </div>
//     </div>
//   );
// };

// export default App;
