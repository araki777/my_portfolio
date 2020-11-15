Rails.application.routes.draw do

  root 'main#index'
  get :brain_training, to: 'brain_training#index'
  get 'tasks#index', to: 'tasks#index'
  resources :tasks
end
