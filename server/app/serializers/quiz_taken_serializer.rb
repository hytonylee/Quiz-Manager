class QuizTakenSerializer < ActiveModel::Serializer
  attributes :id, :score, :correct_answers, :quiz_id, :user_id, :question_id

  belongs_to :quiz
  class QuizSerializer < ActiveModel::Serializer
    attributes :id, :name, :description, :difficulty, :quiz_points
  end
end
