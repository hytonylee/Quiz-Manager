class Quiz < ApplicationRecord
  # OtM Association with Questions
  has_many :questions, dependent: :destroy
  accepts_nested_attributes_for :questions, reject_if: :all_blank, allow_destroy: true

  # MtM Association with Users: through Quiz Taken
  has_many :quiz_takens, dependent: :destroy
  has_many :users, through: :quiz_takens

  # Validations
  validates :name, presence: true
  validates :description, presence: true
  validates :quiz_points, numericality: {greater_than: 0}
  validates :difficulty, presence: true, inclusion: {
    in: %w(Beginner Intermediate Advanced), message: "%{value} is not a valid size"
  }

  before_save :capitalize_name

  # include FriendlyId
  # friendly_id :name, use: [:slugged, :finders]

  private

  def capitalize_name
    self.name.capitalize!
  end

end
