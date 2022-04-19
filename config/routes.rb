Rails.application.routes.draw do
  namespace :api do
    resources :s3, only: [:index]
  end
  
  resources :postcards, only: [:index, :create]
  resources :institutions, only: [:index]

  #standard user signup/login/logout
  post '/signup', to: 'users#create'
  get '/me', to: 'users#show'
  post '/login', to: 'sessions#create'
  post '/inst-login', to: 'sessions#inst_create'
  delete '/inst-logout', to: 'sessions#inst_destroy'
  delete '/logout', to: 'sessions#destroy'
  get '/inst', to: 'institutions#show'
  post '/inst-signup', to: 'institutions#create'
  
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
