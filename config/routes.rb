Rails.application.routes.draw do

  root 'main#index'
  get :brain_training, to: 'brain_training#index'
  resources :users
  resources :tasks
end
