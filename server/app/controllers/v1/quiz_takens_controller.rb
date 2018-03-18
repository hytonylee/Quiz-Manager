class V1::QuizTakensController < ApplicationController

  def create
    qt = QuizTaken.new quiz_taken_params
    qt.question = qt.quiz.questions.order(:id).first
    qt.correct_answers = 0
    qt.save!
  end

  def update
    input_string = params[:input_string]
    correct_input = !!@qt.question.answers.find { |answer| answer.body === input_string }

    @qt.correct_answers += 1 if correct_input

    if @qt.question_id === @qt.quiz.questions.order(:id).last.id
      correct_answers = @qt.correct_answers
      total_questions = @qt.quiz.questions.count
      score_percentage = correct_answers / total_questions * 100

      @qt.score = @qt.quiz.quiz_points * correct_answers / total_questions

      render json: @qt
    else
      current_question_index = @qt.quiz.questions.order(:id).index{ |question| question.id = @qt.question_id }
      @qt.question = @qt.quiz.questions.order(:id)[current_question_index + 1]
    end
  end

  private

  def quiz_taken_params
    params.require(:quiz_taken).permit(:user_id, :quiz_id)
  end

  def find_quiz_taken
    @qt = QuizTaken.find_by(id: params[:id])
  end

end
