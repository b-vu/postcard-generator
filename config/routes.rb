Rails.application.routes.draw do
  resources :postcards, only: [:index, :show, :create]
  resources :institutions, only: [:index, :show]
  resources :recipients, only: [:index, :show, :update, :destroy]
 
  #standard user signup/login/logout
  post '/signup', to: 'users#create'
  get '/me', to: 'users#show'

  post '/login', to: 'sessions#create'
  post '/inst-login', to: 'sessions#inst_create'
  delete '/inst-logout', to: 'sessions#inst_destroy'
  delete '/logout', to: 'sessions#destroy'

  get '/inst', to: 'institutions#show'
  post '/inst-signup', to: 'institutions#create'

  post '/new_recipient', to: 'recipients#create'
  get '/inst-recipients', to: 'recipients#recipients_collect'

  get '/last-image-url', to: 'users#last_image_url'

  get '/users/:id', to: 'users#show_user'
  
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
