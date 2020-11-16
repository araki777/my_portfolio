Rails.application.routes.draw do

  get '/login', to: 'sessions#new'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  root 'main#index'
  get :brain_training, to: 'brain_training#index'
  resources :users
  resources :tasks do
    collection do
      get :todo, :done
    end
  end
end
