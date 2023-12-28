import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Directory from "./Components/Directory.jsx";
import UserDetails from "./Components/UserDetails.jsx";
class App extends React.Component {
  // ... (your existing code)

  render() {
    return (
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Directory />} />
            <Route path="/user/:id" element={<UserDetails />} />
            {/* Add more routes as needed */}
          </Routes>
        </Router>
        <div className="overlay" style={{ display: "none" }} id="div-overlay"></div>
      </div>
    );
  }
}

export default App;
