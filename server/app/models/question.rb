class Question < ApplicationRecord
  # OtM Association with Quizzes
  belongs_to :quiz

  # OtM Association with Answers
  has_many :answers, dependent: :destroy
  accepts_nested_attributes_for :answers, reject_if: :all_blank, allow_destroy: true

  # OtM Association with Quiz_Takens
  has_many :quiz_takens, dependent: :nullify

  # Validations
  validates :body, presence: true, length: {minimum: 10}
end
