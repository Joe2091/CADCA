class BooksController < ApplicationController
  def index
    books = Book.all
    render json: books
  end

  def create
    book = Book.new(book_params)
    if book.save
      render json: book, status: :created
    else
      render json: { errors: book.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    book = Book.find(params[:id])
    if book.destroy
      render json: { message: "Book deleted successfully" }, status: :ok
    else
      render json: { error: "Failed to delete book" }, status: :unprocessable_entity
    end
  end

  private

  def book_params
    params.require(:book).permit(:title, :author, :available)
  end
end
