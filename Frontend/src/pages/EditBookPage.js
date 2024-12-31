import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../services/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditBookPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState({ title: "", author: "", available: true });
  const [validationErrors, setValidationErrors] = useState({ title: "", author: "" });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching book details:", error);
        setLoading(false);
      });
  }, [id]);

  const validateField = (field, value) => {
    if (!value) {
      setValidationErrors((prev) => ({ ...prev, [field]: `${field} is required.` }));
    } else {
      setValidationErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!book.title || !book.author) {
      toast.error("Both Title and Author are required.");
      return;
    }

    axios
      .put(`/books/${id}`, book)
      .then(() => {
        toast.success("Book updated successfully!");
        setTimeout(() => navigate("/"), 2000);
      })
      .catch((error) => {
        console.error("Error updating book:", error);
        toast.error("An error occurred while updating the book. Please try again.");
      });
  };

  if (loading) {
    return <div className="text-center mt-5"><div className="spinner-border" role="status"></div></div>;
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Edit Book</h1>
      <div className="card shadow">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="title" className="form-label">Title:</label>
                <input
                  type="text"
                  id="title"
                  className={`form-control ${validationErrors.title ? "is-invalid" : ""}`}
                  value={book.title}
                  onChange={(e) => {
                    setBook({ ...book, title: e.target.value });
                    validateField("title", e.target.value);
                  }}
                />
                <div className="invalid-feedback">{validationErrors.title}</div>
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="author" className="form-label">Author:</label>
                <input
                  type="text"
                  id="author"
                  className={`form-control ${validationErrors.author ? "is-invalid" : ""}`}
                  value={book.author}
                  onChange={(e) => {
                    setBook({ ...book, author: e.target.value });
                    validateField("author", e.target.value);
                  }}
                />
                <div className="invalid-feedback">{validationErrors.author}</div>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="available" className="form-label">Availability:</label>
              <select
                id="available"
                className="form-select"
                value={book.available}
                onChange={(e) => setBook({ ...book, available: e.target.value === "true" })}
              >
                <option value="true">Available</option>
                <option value="false">Borrowed</option>
              </select>
            </div>
            <div className="row">
              <div className="col-md-6">
                <button type="submit" className="btn btn-primary w-100">Save Changes</button>
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

export default EditBookPage;
