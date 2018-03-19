class V1::AnswersController < ApplicationController
  before_action :find_answer, only: [:update, :destroy]
  before_action :authorize_user!
  def create
    answer = Answer.new answer_params
    answer.question = Question.find_by(id: params[:question_id])
    answer.save!

    render json: answer.question.quiz
  end

  def update
    @answer.update! answer_params
    render json: @answer.question.quiz
  end

  def destroy
    @answer.destroy
  end

  private

  def answer_params
    params.require(:answer).permit(:body)
  end

  def find_answer
    @answer = Answer.find_by(id: params[:id])
  end

  def authorize_user!
    unless can?(:manage, :all)
      
      render(
        json: { errors: [{type: "Unauthorized"}] }, status: :unauthorized
      )
    end
  end
end
