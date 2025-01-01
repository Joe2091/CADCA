import React from "react";

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container">
      <a className="navbar-brand" href="/">
        <i className="bi bi-book me-2"></i> 
        Online Library
      </a>
      <div>
        <a className="btn btn-outline-light me-2" href="/add">
          Add Book
        </a>
        <a className="btn btn-outline-light" href="/">
          Home
        </a>
      </div>
    </div>
  </nav>
);

export default Navbar;
