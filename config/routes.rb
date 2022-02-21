Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  get "/boards" , to: "boards#index"
  get "/boards/:link", to: "boards#show"

  namespace :api do
    namespace :v1 do
      get "/boards/:link", to: "boards#show"
      post "/boards", to: "boards#create"

      get "/colomns/:board_id", to: "colomns#index"
      post "/colomns", to: "colomns#create"
      delete "/colomns/:id", to: "colomns#destroy"
      put "/colomns/:id", to: "colomns#update"

      get "/cards/:colomn_id", to: "cards#index"
      post "/cards", to: "cards#create"
      delete "/cards/:id", to: "cards#destroy"
      put "/cards/:id", to: "cards#update"
      put "/card_move_left/:id", to: "cards#card_move_left"
      put "/card_move_right/:id", to: "cards#card_move_right"
      
      # putch "/cards/:id", to: "cards#edit"
      #resources :boards, only: [:create, :show]
      # delete 'boards/:id', to: 'boards#destroy'
    end
  end
  #root "boards#index"
end
