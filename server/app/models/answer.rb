class Answer < ApplicationRecord
  # OtM Association with Questions
  belongs_to :question

  # Validations
  validates :body, presence: true, length: {minimum: 10}
end
