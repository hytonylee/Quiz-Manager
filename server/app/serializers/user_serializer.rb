class UserSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :email, :total_score, :number_of_badges

  has_many :quiz_takens
  class QuizTakenSerializer < ActiveModel::Serializer
    attributes :id, :score, :correct_answers

    belongs_to :quiz
    class QuizSerializer < ActiveModel::Serializer
      attributes :id, :name, :description, :difficulty, :quiz_points
    end
  end

end
