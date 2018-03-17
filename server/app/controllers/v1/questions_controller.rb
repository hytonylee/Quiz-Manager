class V1::QuestionsController < ApplicationController
  before_action :find_question, only: [:update, :delete]

  def create
    question = Question.new question_params
    question.quiz = Quiz.find_by(id: params[:quiz_id])
    question.save!

    render json: question.quiz
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
end
