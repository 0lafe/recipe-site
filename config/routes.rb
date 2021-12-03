Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root "homes#index"

  namespace :api do
    namespace :v1 do
      resources :users, only: [:index]
      resources :recipes, only: [:index, :show]
      resources :spoon_recipes, only: [:index, :new]
      resources :user_favorites, only: [:create]
    end
  end

  get "*path", to: "homes#index"

end
