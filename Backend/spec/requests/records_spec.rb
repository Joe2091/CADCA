require 'rails_helper'

RSpec.describe "Records", type: :request do
  describe "GET /records" do
    it "returns all records" do
      create(:record, title: "Test", content: "Sample Content")

      get "/records"

      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body).size).to eq(1)
    end
  end
end
