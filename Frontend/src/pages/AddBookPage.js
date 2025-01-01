import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../services/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddBookPage = () => {
  const [book, setBook] = useState({ title: "", author: "", available: true });
  const [errors, setErrors] = useState({ title: "", author: "" });
  const navigate = useNavigate();

  const validateField = (field, value) => {
    if (!value) {
      setErrors((prev) => ({ ...prev, [field]: `${field} is required` }));
    } else {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleInputChange = (field, value) => {
    setBook((prevBook) => ({ ...prevBook, [field]: value }));
    validateField(field, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!book.title || !book.author) {
      toast.error("Both Title and Author are required.");
      return;
    }

    axios
      .post("/books", book)
      .then(() => {
        toast.success("Book added successfully!");
        setTimeout(() => navigate("/"), 2000); 
      })
      .catch((error) => {
        console.error("Error adding book:", error);
        toast.error("An error occurred while adding the book. Please try again.");
      });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Add a Book</h1>
      <div className="card shadow">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="title" className="form-label">
                  Title:
                </label>
                <input
                  type="text"
                  id="title"
                  className={`form-control ${errors.title ? "is-invalid" : ""}`}
                  value={book.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                />
                <div className="invalid-feedback">{errors.title}</div>
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="author" className="form-label">
                  Author:
                </label>
                <input
                  type="text"
                  id="author"
                  className={`form-control ${errors.author ? "is-invalid" : ""}`}
                  value={book.author}
                  onChange={(e) => handleInputChange("author", e.target.value)}
                />
                <div className="invalid-feedback">{errors.author}</div>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="available" className="form-label">Availability:</label>
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
            <div className="row">
              <div className="col-md-6">
                <button type="submit" className="btn btn-primary w-100">
                  Save Book
                </button>
              </div>
              <div className="col-md-6">
                <button
                  type="button"
                  className="btn btn-secondary w-100"
                  onClick={() => setBook({ title: "", author: "", available: true })}
                >
                  Reset
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddBookPage;
