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

  # グループ画面
  resources :groups do
    resources :messages, only: [:index, :create]
  end

  # タスク管理ページ
  resources :tasks do
    collection do
      get :main
      get :configuration
      post :configuration_update
    end
  end

  get :search, to: 'tasks#search'
end
