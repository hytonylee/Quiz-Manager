class AddColumnQuizPointsInQuizzes < ActiveRecord::Migration[5.1]
  def change
    add_column :quizzes, :quiz_points, :integer
  end
end
