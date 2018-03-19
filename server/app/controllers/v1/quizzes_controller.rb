class V1::QuizzesController < ApplicationController
  before_action :authenticate_user!
  before_action :find_quiz, only: [:show, :update, :destroy]
  before_action :authorize_user!, except: [:index, :show]

  def index
    render json: Quiz.order(:id)
  end

  def show
    render json: @quiz
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
    render json: Quiz.order(:id)
  end

  private

  def quiz_params
    params.require(:quiz).permit(:name, :description, :difficulty, :quiz_points)
  end

  def find_quiz
    @quiz = Quiz.find_by!(id: params[:id])
  end

  def authorize_user!
    unless can?(:manage, :all)
      #
      render(
        json: { errors: [{type: "Unauthorized"}] }, status: :unauthorized
      )
    end
 end

end


# resources :quizzes, only: [:create, :index, :show, :update, :destroy], shallow: true do
