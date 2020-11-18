Rails.application.routes.draw do

  # ログインパス
  get '/login', to: 'sessions#new'
  post '/login', to: 'sessions#create'
  post '/guest_login', to: 'sessions#new_guest'
  delete '/logout', to: 'sessions#destroy'

  # トップページ
  root 'top_pages#index'

  # 脳トレページ
  get :brain_training, to: 'brain_training#index'

  # ユーザー管理ページ
  resources :users

  # タスク管理ページ
  resources :tasks do
    collection do
      get :main
    end
  end

  get :configuration, to: 'tasks#configuration'
  post :configuration_update, to: 'tasks#configuration_update'

  get :search, to: 'tasks#search'
end
