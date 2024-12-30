import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../services/axios";

const AddBookPage = () => {
  const [book, setBook] = useState({ title: "", author: "", available: true }); // Include 'available' field
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!book.title || !book.author) {
      setError("Both Title and Author are required.");
      return;
    }

    // Send POST request to backend to add book
    axios
      .post("/books", book)
      .then(() => navigate("/")) // Redirect to homepage after successful submission
      .catch((error) => {
        console.error("Error adding book:", error);
        setError("An error occurred while adding the book. Please try again.");
      });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Add a Book</h1>
      <div className="card shadow">
        <div className="card-body">
          {error && <p className="text-danger">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title:
              </label>
              <input
                type="text"
                id="title"
                className="form-control"
                value={book.title}
                onChange={(e) => setBook({ ...book, title: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="author" className="form-label">
                Author:
              </label>
              <input
                type="text"
                id="author"
                className="form-control"
                value={book.author}
                onChange={(e) => setBook({ ...book, author: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="available" className="form-label">
                Availability:
              </label>
              <select
                id="available"
                className="form-select"
                value={book.available}
                onChange={(e) =>
                  setBook({ ...book, available: e.target.value === "true" })
                }
              >
                <option value="true">Available</option>
                <option value="false">Borrowed</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Save Book
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBookPage;
