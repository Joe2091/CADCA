class UsersController < ApplicationController
  # Before actions to handle common tasks
  before_action :set_user, only: [ :show, :update, :destroy ]

  # GET /users
  def index
    @users = User.all.order(created_at: :desc)
    render json: @users, status: :ok
  end

  # GET /users/:id
  def show
    render json: @user, status: :ok
  end

  # POST /users
  def create
    @user = User.new(user_params)

    if @user.save
      render json: @user, status: :created
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /users/:id
  def update
    if @user.update(user_params)
      render json: @user, status: :ok
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /users/:id
  def destroy
    @user.destroy
    render json: { message: "User deleted successfully" }, status: :ok
  end

  private

  # Find user for actions requiring an ID
  def set_user
    @user = User.find_by(id: params[:id])
    render json: { error: "User not found" }, status: :not_found unless @user
  end

  # Whitelist permitted parameters
  def user_params
    params.require(:user).permit(:name, :email, :age)
  end
end
