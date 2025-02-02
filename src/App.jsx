import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./Components/SignUp/SignUp";
import Scrapping from "./Components/Scrapping/Scrapping";
import ChatBot from "./Components/ChatBot/ChatBot";
import "./App.css";

class App extends Component {
  render() {
    return (
      <>
       <Router>
    <Routes>
      {/* <Route path="/" element={<App />} /> */}
      <Route path="/" element={<SignUp />} />
      <Route path="/scrapping" element={<Scrapping />} />
      <Route path="/chatbot" element={<ChatBot />} />
    </Routes>
  </Router>
      </>
    );
  }
}

export default App;
