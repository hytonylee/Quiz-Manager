class AddDeployedToQuizzes < ActiveRecord::Migration[5.1]
  def change
    add_column :quizzes, :deployed, :boolean, default: false
  end
end
