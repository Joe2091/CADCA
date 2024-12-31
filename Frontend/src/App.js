import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddBookPage from "./pages/AddBookPage";
import EditBookPage from "./pages/EditBookPage"; // Import EditBookPage
import Navbar from "./components/Navbar"; // Import Navbar

const App = () => {
  return (
    <Router>
      {/* Render Navbar at the top */}
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add" element={<AddBookPage />} />
          <Route path="/edit/:id" element={<EditBookPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
