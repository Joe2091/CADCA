class RecordsController < ApplicationController
  # GET /records
  def index
    records = Record.all
    render json: records
  end

  # GET /records/:id
  def show
    record = Record.find(params[:id])
    render json: record
  end

  # POST /records
  def create
    record = Record.new(record_params)
    if record.save
      render json: record, status: :created
    else
      render json: { errors: record.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /records/:id
  def update
    record = Record.find(params[:id])
    if record.update(record_params)
      render json: record
    else
      render json: { errors: record.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /records/:id
  def destroy
    record = Record.find(params[:id])
    record.destroy
    head :no_content
  end

  private

  def record_params
    params.require(:record).permit(:title, :content)
  end
end
