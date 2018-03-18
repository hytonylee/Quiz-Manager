Rails.application.routes.draw do
  namespace :v1 do
    resources :users, only: [:new, :create, :index, :show], shallow: true do
      resources :quiz_takens, only: [:create, :update]
    end
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
