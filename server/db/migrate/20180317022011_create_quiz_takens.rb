class CreateQuizTakens < ActiveRecord::Migration[5.1]
  def change
    create_table :quiz_takens do |t|
      t.references :user, foreign_key: true
      t.references :quiz, foreign_key: true
      t.references :question, foreign_key: true
      t.integer :correct_answers
      t.integer :score

      t.timestamps
    end
  end
end
