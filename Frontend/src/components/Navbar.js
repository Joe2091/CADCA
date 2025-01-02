import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; 
import { auth } from "../firebase"; 

const Navbar = () => {
  const { currentUser } = useContext(AuthContext); 
  const navigate = useNavigate();

  const handleLogout = async () => {
    await auth.signOut(); 
    navigate("/login"); 
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <i className="bi bi-book me-2"></i>
          Online Library
        </Link>
        <div>
          {currentUser ? (
            <>
              <Link className="btn btn-outline-light me-2" to="/add">
                Add Book
              </Link>
              <button className="btn btn-danger" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-outline-light me-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-outline-light" to="/signup">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
