Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :todos do
    get :completed, on: :member
  end
  resources :users, only: [:create] do
    post :login, on: :collection
  end
end
