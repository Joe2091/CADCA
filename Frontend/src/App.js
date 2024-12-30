import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddBookPage from "./pages/AddBookPage";
import Navbar from "./components/Navbar"; // Import the Navbar component

const App = () => {
  return (
    <Router>
      <Navbar /> {/* Add the Navbar at the top */}
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add" element={<AddBookPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
