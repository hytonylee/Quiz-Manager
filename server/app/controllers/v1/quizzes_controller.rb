class V1::QuizzesController < ApplicationController

  def index
    render json: Quiz.order(:id)
  end

  def show
    render json: Quiz.find(params[:id])
  end

  def create
    quiz_params = params.require(:quiz).permit(:name, :description, :difficulty, :quiz_points)
    quiz = Quiz.new()

  end

end


# resources :quizzes, only: [:create, :index, :show, :update, :destroy], shallow: true do
