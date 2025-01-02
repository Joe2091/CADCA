Rails.application.routes.draw do
  namespace :api do
    resources :books, only: [ :index, :show, :create, :update, :destroy ] do
      member do
        patch :toggle
      end
    end
    resources :users
  end

  get "*path", to: "home#index", constraints: ->(req) { !req.xhr? && req.format.html? }

  root "frontend#index"

  get "up" => "rails/health#show", as: :rails_health_check
end
