class V1::QuizzesController < ApplicationController
  before_action :find_quiz, only: [:update, :delete]

  def index
    render json: Quiz.order(:id)
  end

  def show
    render json: Quiz.find(params[:id])
  end

  def create
    quiz = Quiz.new quiz_params
    quiz.save!

    render json: quiz
  end

  def update
    @quiz.update! quiz_params
    render json: @quiz

  end

  def destroy
    @quiz.destroy
  end

  private

  def quiz_params
    params.require(:quiz).permit(:name, :description, :difficulty, :quiz_points)
  end

  def find_quiz
    @quiz = Quiz.find_by(id: params[:id])
  end


end


# resources :quizzes, only: [:create, :index, :show, :update, :destroy], shallow: true do
