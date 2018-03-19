class V1::QuestionsController < ApplicationController
  before_action :authenticate_user!
  before_action :find_question, only: [:show, :update, :destroy]
  before_action :authorize_user!, except: [:show]


  def create
    question = Question.new question_params
    question.quiz = Quiz.find_by(id: params[:quiz_id])
    question.save!
    answers = params[:answers_attributes]
    answers.each do |index, answer|
      a = Answer.new(body: answer['body'])
      a.question = question
      a.save!
    end


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
    render json: @question.quiz
  end

  private

  def question_params
    params.require(:question).permit(:body, { answers_attributes: [:id, :body, :_destroy] })
  end

  def find_question
    @question = Question.find_by(id: params[:id])
  end

  def authorize_user!
    unless can?(:manage, :all)

      render(
        json: { errors: [{type: "Unauthorized"}] }, status: :unauthorized
      )
    end
  end
end
