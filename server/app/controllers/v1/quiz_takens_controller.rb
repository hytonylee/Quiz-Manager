class V1::QuizTakensController < ApplicationController
  before_action :authenticate_user!, only: [:index]
  before_action :find_quiz_taken, only: [:update, :destroy]


  def create
    qt = QuizTaken.new(user_id: params[:user_id], quiz_id: params[:quiz_id])
    qt.question = qt.quiz.questions.order(:id).first
    qt.correct_answers = 0
    qt.save!

    render json: qt
  end

  def index
    render json: QuizTaken.all
  end

  def destroy
    @qt.destroy
    render json: QuizTaken.all
  end

  def update
    # For the evaluated quiz, compare the previous max scor e with the current
    # one. Increase the user's total score by the difference.
    previous_array = QuizTaken.where(user_id: @qt.user_id, quiz_id: @qt.quiz_id).map { |qt| qt.score }
    previous_max = previous_array.max
    @qt.correct_answers = params[:correct_answers]

    correct_answers = @qt.correct_answers
    total_questions = @qt.quiz.questions.count
    quiz_points = @qt.quiz.quiz_points

    @qt.score = quiz_points * correct_answers / total_questions
    @qt.save

    now_array = QuizTaken.where(user_id: @qt.user_id, quiz_id: @qt.quiz_id).map { |qt| qt.score }
    now_max = now_array.max

    user = User.find @qt.user_id
    user.total_score = user.total_score - previous_max + now_max
    user.number_of_badges += 1 if previous_max != quiz_points && now_max == quiz_points
    user.save
    render json: @qt
  end

  # def update
  #   # Compare user's input string for a question and check if it is found in the answers.
  #   input_string = params[:input_string]
  #   correct_input = !!@qt.question.answers.find { |answer| answer.body === input_string }
  #
  #   @qt.correct_answers += 1 if correct_input
  #
  #   if @qt.question_id === @qt.quiz.questions.order(:id).last.id
  #     # If this was the last question, calculate results of quiz. For the evaluated
  #     # quiz, compare the previous max scor e with the current one. Increase the
  #     # user's total score by the difference.
  #     previous_array = QuizTaken.where(user_id: @qt.user_id, quiz_id: @qt.quiz_id).map { |qt| qt.score }
  #     previous_max = previous_array.max
  #
  #     correct_answers = @qt.correct_answers
  #     total_questions = @qt.quiz.questions.count
  #     quiz_points = @qt.quiz.quiz_points
  #
  #     @qt.score = quiz_points * correct_answers / total_questions
  #     @qt.score = quiz_points if @qt.score > quiz_points
  #
  #     @qt.save
  #
  #     now_array = QuizTaken.where(user_id: @qt.user_id, quiz_id: @qt.quiz_id).map { |qt| qt.score }
  #     now_max = now_array.max
  #
  #     user = User.find @qt.user_id
  #     user.total_score = user.total_score - previous_max + now_max
  #     user.number_of_badges += 1 if previous_max != quiz_points && now_max == quiz_points
  #     user.save
  #
  #   else
  #     # Else, increase the question index of the evaluated quiz by one.
  #     current_question_index = @qt.quiz.questions.order(:id).index{ |question| question.id == @qt.question_id }
  #     @qt.question = @qt.quiz.questions.order(:id)[current_question_index + 1]
  #     @qt.save
  #   end
  #   render json: @qt
  # end

  private

  def find_quiz_taken
    @qt = QuizTaken.find_by(id: params[:id])
  end

end
