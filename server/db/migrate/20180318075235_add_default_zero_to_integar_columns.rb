class AddDefaultZeroToIntegarColumns < ActiveRecord::Migration[5.1]
  def change
    change_column_default :users, :number_of_badges, 0
    change_column_default :users, :total_score, 0
    change_column_default :quiz_takens, :score, 0
  end
end
