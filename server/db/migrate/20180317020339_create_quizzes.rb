class CreateQuizzes < ActiveRecord::Migration[5.1]
  def change
    create_table :quizzes do |t|
      t.string :name
      t.string :description
      t.string :difficulty
      t.integer :points

      t.timestamps
    end
  end
end
