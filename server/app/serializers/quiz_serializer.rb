class QuizSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :difficulty, :quiz_points, :deployed

  has_many :questions
  class QuestionSerializer < ActiveModel::Serializer
    attributes :id, :body

    has_many :answers
    class AnswerSerializer < ActiveModel::Serializer
      attributes :id, :body
    end
  end

end
