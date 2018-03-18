class AddNumberOfBadgesToUser < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :number_of_badges, :integer
  end
end
