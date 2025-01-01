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

  
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  
  const availableCount = books.filter((book) => book.available).length;
  const borrowedCount = books.length - availableCount;

  return (
    <div>
      <div
        className="text-center py-5"
        style={{
          backgroundColor: "#212529",
          color: "white",
        }}
      >
        <h1 className="fw-bold">Online Library</h1>
        <p className="fs-5">Books at the touch of a button.</p>
        <Link to="/add" className="btn btn-light btn-lg mt-3">
          Add New Book
        </Link>
      </div>

      <div className="container my-4">
        <div className="row text-center">
          <div className="col-md-6 mb-3">
            <div className="card bg-success text-white shadow">
              <div className="card-body">
                <h5 className="card-title">Available Books</h5>
                <p className="display-4">{availableCount}</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <div className="card bg-danger text-white shadow">
              <div className="card-body">
                <h5 className="card-title">Borrowed Books</h5>
                <p className="display-4">{borrowedCount}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container my-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search for a book by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

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

      <ToastContainer />
    </div>
  );
};

export default HomePage;
