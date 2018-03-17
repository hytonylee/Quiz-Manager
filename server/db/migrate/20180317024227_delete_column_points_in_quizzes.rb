class DeleteColumnPointsInQuizzes < ActiveRecord::Migration[5.1]
  def change
    remove_column :quizzes, :points
  end
end
