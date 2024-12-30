import React, { useEffect, useState } from "react";
import axios from "../services/axios";

const HomePage = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get("/books")
      .then((response) => setBooks(response.data))
      .catch((error) => console.error("Error fetching books:", error));
  }, []);

  const toggleAvailability = (bookId) => {
    axios.patch(`/books/${bookId}/toggle`).then(() => {
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.id === bookId ? { ...book, available: !book.available } : book
        )
      );
    });
  };

  const deleteBook = (bookId) => {
    // Confirmation before deletion
    if (window.confirm("Are you sure you want to delete this book?")) {
      axios
        .delete(`/books/${bookId}`)
        .then(() => {
          setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
        })
        .catch((error) => console.error("Error deleting book:", error));
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Library Management System</h1>
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">Available Books</h4>
        </div>
        <div className="card-body">
          {books.length > 0 ? (
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book, index) => (
                  <tr key={book.id}>
                    <td>{index + 1}</td>
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
                    <td>
                      <button
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() => toggleAvailability(book.id)}
                      >
                        {book.available ? "Borrow" : "Return"}
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => deleteBook(book.id)}
                      >
                        <i className="bi bi-trash"></i> {/* Bootstrap Trash Icon */}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center">No books available. Please add some!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
