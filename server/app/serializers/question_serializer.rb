class QuestionSerializer < ActiveModel::Serializer
  attributes :id, :body, :answers

  has_many :answers
  class AnswerSerializer < ActiveModel::Serializer
    attributes :id, :body
  end
end
