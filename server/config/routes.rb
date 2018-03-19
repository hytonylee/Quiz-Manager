Rails.application.routes.draw do
  namespace :v1 do
    # post "reset_password", to: "users#reset_password"

    resources :users, only: [:new, :create, :index, :show], shallow: true do
      post "reset_password", on: :collection
    end
    resources :quiz_takens, only: [:create, :update, :index, :destroy]
    resources :quizzes, only: [:create, :index, :show, :update, :destroy], shallow: true do
      resources :questions, only: [:create, :show, :update, :destroy] do
        resources :answers, only: [:create, :update, :destroy]
      end
    end

    resources :tokens, only: [:create, :destroy]

    namespace :admin do
      resources :dashboard, only: [:index]
    end

  end


  match "*unmatched_route", to: "application#not_found", via: :all

end
