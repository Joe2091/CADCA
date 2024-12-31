class BooksController < ApplicationController
  def index
    books = Book.all
    render json: books
  end

  def show
    book = Book.find_by(id: params[:id])
    if book
      render json: book, status: :ok
    else
      render json: { error: "Book not found" }, status: :not_found
    end
  end

  def create
    book = Book.new(book_params)
    if book.save
      render json: book, status: :created
    else
      render json: { errors: book.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def toggle
    book = Book.find_by(id: params[:id])
    if book
      book.update(available: !book.available)
      render json: { message: "Book status updated successfully", book: book }, status: :ok
    else
      render json: { error: "Book not found" }, status: :not_found
    end
  end

  def destroy
    book = Book.find_by(id: params[:id])
    if book&.destroy
      render json: { message: "Book deleted successfully" }, status: :ok
    else
      render json: { error: "Failed to delete book" }, status: :unprocessable_entity
    end
  end

  def update
    book = Book.find_by(id: params[:id])
    if book&.update(book_params)
      render json: book, status: :ok
    else
      render json: { errors: book.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def book_params
    params.require(:book).permit(:title, :author, :available)
  end
end
