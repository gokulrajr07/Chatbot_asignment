import React, { useState } from "react";
// import "./../../App.css";
import "./ChatBot.css";

// Dummy component for chatbot testing modal
const TestChatbotModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="chatbot-container">
          <div className="chatbot">
            <div className="chatbot-header">Chatbot</div>
            <div className="chatbot-content">
              <p>Chatbot not working as intended? Share feedback.</p>
            </div>
            <form className="feedback-form">
              <textarea placeholder="Enter your feedback..." rows="4" />
              <button type="submit">Submit Feedback</button>
            </form>
          </div>
        </div>
        <button onClick={onClose} className="close-button">
          Close
        </button>
      </div>
    </div>
  );
};

// Instructions with Code Snippets
const IntegrationInstructions = () => {
  return (
    <div className="instructions">
      <h3>Easy-to-Follow Instructions</h3>
      <p>
        Follow these simple steps to integrate the chatbot into your website:
      </p>
      <div className="instruction-step">
        <h4>Step 1: Add the following script tag to your website:</h4>
        <pre>
          <code>{`<script src="chatbot-script.js"></script>`}</code>
        </pre>
      </div>
      <div className="instruction-step">
        <h4>Step 2: Place the chatbot div in your HTML:</h4>
        <pre>
          <code>{`<div id="chatbot"></div>`}</code>
        </pre>
      </div>
    </div>
  );
};

// Email Developer Form
const SendToDeveloper = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Email sent to developer at ${email}`);
  };

  return (
    <div className="developer-form">
      <h3>Send Instructions to Developer</h3>
      <form onSubmit={handleSubmit}>
        <label>Email address</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter developer's email"
          required
        />
        <button type="submit">Send Email</button>
      </form>
    </div>
  );
};

// Integration Success Screen (with confetti)
const IntegrationSuccess = () => {
  return (
    <div className="success-screen">
      <h2>Integration Successful!</h2>
      <div className="confetti"></div>
      <div className="post-success-actions">
        <button>Explore Admin Panel</button>
        <button>Start Talking to Your Chatbot</button>
        <div className="social-share">
          <button>Share on Twitter</button>
          <button>Share on LinkedIn</button>
        </div>
      </div>
    </div>
  );
};

// Integration Error Screen
const IntegrationError = ({ onRetry }) => {
  return (
    <div className="error-screen">
      <h2>Integration not detected yet</h2>
      <p>Please check the code on your website or contact support.</p>
      <button onClick={onRetry}>Re-test Integration</button>
      <button>Contact Support</button>
    </div>
  );
};

const ChatBot = () => {
  const [isChatbotModalOpen, setIsChatbotModalOpen] = useState(false);
  const [integrationStatus, setIntegrationStatus] = useState(""); // success, error, or in-progress
  const [step, setStep] = useState(1);

  const handleTestChatbot = () => {
    setIsChatbotModalOpen(true);
  };

  const handleCloseChatbotModal = () => {
    setIsChatbotModalOpen(false);
  };

  const handleRetryIntegration = () => {
    setIntegrationStatus(""); // Reset status for re-test
    setStep(4); // Go to the step where integration can be retried
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  return (
    <div className="app">
      <div className="progress-bar">
        <span>Step {step} of 5</span>
      </div>

      <div className="title">
        <h1>Test & Integrate Your Chatbot</h1>
      </div>

      {step === 1 && (
        <div className="test-chatbot">
          <button onClick={handleTestChatbot}>Test Chatbot</button>
        </div>
      )}

      {step === 2 && (
        <div className="integrate-options">
          <button onClick={handleNextStep}>Easy-to-Follow Instructions</button>
          <button onClick={handleNextStep}>
            Send Instructions to Developer
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="integration-test">
          <button onClick={handleNextStep}>Test Integration</button>
        </div>
      )}

      {step === 4 && integrationStatus === "success" && <IntegrationSuccess />}
      {step === 4 && integrationStatus === "error" && (
        <IntegrationError onRetry={handleRetryIntegration} />
      )}
      {step === 5 && (
        <div className="final-success">
          <h2>Final Step: Complete!</h2>
          <button>Start Chatbot</button>
        </div>
      )}

      <TestChatbotModal
        isOpen={isChatbotModalOpen}
        onClose={handleCloseChatbotModal}
      />

      <div className="navigation">
        {step > 1 && <button onClick={handlePreviousStep}>Back</button>}
        {step < 5 && <button onClick={handleNextStep}>Next</button>}
      </div>
    </div>
  );
};

export default ChatBot;
