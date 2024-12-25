import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Router, Routes, and Route
import HomePage from './HomePage';
import RecordsPage from './RecordsPage'; // Assuming your RecordsPage is in the pages folder
import UserForm from './components/UserForm'; // Your UserForm component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Route for HomePage */}
        <Route path="/records" element={<RecordsPage />} /> {/* Route for RecordsPage */}
      </Routes>

      {/* User Form can be a separate page or a component displayed within your pages */}
      <div style={{ marginTop: '2rem' }}>
        <h1>Users</h1>
        <UserForm />
      </div>
    </Router>
  );
}

export default App;
