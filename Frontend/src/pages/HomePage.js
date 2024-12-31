import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../services/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Search state

  useEffect(() => {
    axios
      .get("/books")
      .then((response) => setBooks(response.data))
      .catch((error) => console.error("Error fetching books:", error));
  }, []);

  const toggleAvailability = (bookId, currentStatus) => {
    axios
      .patch(`/books/${bookId}/toggle`)
      .then(() => {
        const updatedBooks = books.map((book) =>
          book.id === bookId ? { ...book, available: !currentStatus } : book
        );
        setBooks(updatedBooks);

        const status = !currentStatus ? "Available" : "Borrowed";
        toast.success(`Book status changed to ${status}!`);
      })
      .catch((error) => {
        console.error("Error toggling book status:", error);
        toast.error("Failed to change book status. Please try again.");
      });
  };

  const deleteBook = (bookId) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      axios
        .delete(`/books/${bookId}`)
        .then(() => {
          setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
          toast.success("Book deleted successfully!");
        })
        .catch((error) => {
          console.error("Error deleting book:", error);
          toast.error("Failed to delete book. Please try again.");
        });
    }
  };

  // Filter books based on search query
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {/* Hero Section */}
      <div
  className="text-center py-5"
  style={{
    backgroundColor: "#007bff", // Replace with your desired color
    color: "white",
  }}
>
  <h1 className="fw-bold">Library Management System</h1>
  <p className="fs-5">Your digital library, simplified and efficient.</p>
  <Link to="/add" className="btn btn-light btn-lg mt-3">
    Add New Book
  </Link>
</div>


      {/* Quote Section */}
      <p className="text-center mt-3 fst-italic">
        "A room without books is like a body without a soul." – Cicero
      </p>

      {/* Search Bar */}
      <div className="container my-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search for a book by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Main Content */}
      <div className="container mt-5">
        {filteredBooks.length > 0 ? (
          <div className="card shadow">
            <div className="card-header bg-dark text-white">
              <h4 className="mb-0">Available Books</h4>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover table-striped">
                  <thead className="table-dark">
                    <tr>
                      <th>#</th>
                      <th>Cover</th>
                      <th>
                        <i className="bi bi-book-fill me-2"></i> Title
                      </th>
                      <th>
                        <i className="bi bi-person-fill me-2"></i> Author
                      </th>
                      <th>
                        <i className="bi bi-check-circle me-2"></i> Status
                      </th>
                      <th className="text-center">
                        <i className="bi bi-tools me-2"></i> Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBooks.map((book, index) => (
                      <tr key={book.id}>
                        <td>{index + 1}</td>
                        <td>
                          <img
                            src={book.coverUrl || "https://via.placeholder.com/50x75?text=No+Cover"}
                            alt={book.title}
                            style={{
                              width: "50px",
                              height: "75px",
                              objectFit: "cover",
                            }}
                          />
                        </td>
                        <td>{book.title}</td>
                        <td>{book.author}</td>
                        <td>
                          <span
                            className={`badge ${
                              book.available ? "bg-success" : "bg-danger"
                            }`}
                          >
                            {book.available ? "Available" : "Borrowed"}
                          </span>
                        </td>
                        <td className="text-center">
                          <div className="btn-group" role="group">
                            <button
                              className="btn btn-sm btn-primary"
                              onClick={() =>
                                toggleAvailability(book.id, book.available)
                              }
                            >
                              {book.available ? "Borrow" : "Return"}
                            </button>
                            <Link
                              to={`/edit/${book.id}`}
                              className="btn btn-sm btn-warning"
                            >
                              <i className="bi bi-pencil-fill"></i>
                            </Link>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => deleteBook(book.id)}
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="card shadow mx-auto" style={{ maxWidth: "600px" }}>
              <div className="card-body">
                <h4>No Books Found</h4>
                <p>
                  {searchQuery
                    ? `No books found for "${searchQuery}".`
                    : "Add new books to manage your library effectively."}
                </p>
                <Link to="/add" className="btn btn-primary">
                  Add New Book
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default HomePage;
