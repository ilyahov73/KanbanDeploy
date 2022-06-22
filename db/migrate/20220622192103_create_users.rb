class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :email
      t.string :name
      t.string :surname
      t.string :credit_card_num
      t.string :role

      t.timestamps
    end
  end
end
