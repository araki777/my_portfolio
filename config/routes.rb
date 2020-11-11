Rails.application.routes.draw do

  root :to => 'main#index'
  get :brain_training, to: 'brain_training#index'
end
