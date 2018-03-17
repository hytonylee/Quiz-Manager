class V1::QuestionsController < ApplicationController
  before_action :authenticate_user!
  before_action :find_question, only: [:show, :update, :destroy]
  before_action :authorize_user!

  def create
    question = Question.new question_params
    question.quiz = Quiz.find_by(id: params[:quiz_id])
    question.save!

    render json: question.quiz
  end

  def show
    render json: @question
  end

  def update
    @question.update! question_params
    render json: @question.quiz
  end

  def destroy
    @question.destroy
  end

  private

  def question_params
    params.require(:question).permit(:body)
  end

  def find_question
    @question = Question.find_by(id: params[:id])
  end
  
  def authorize_user!
    unless can?(:manage, :all)
      flash[:alert] = 'Access Denied!'
      render(
        json: { errors: [{type: "Unauthorized"}] }, status: :unauthorized
      )
    end
  end
end
