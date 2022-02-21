class CreateColomns < ActiveRecord::Migration[7.0]
  def change
    create_table :colomns do |t|
      t.string :title
      t.integer :position
      t.references :board, null: false, foreign_key: true

      t.timestamps
    end
  end
end
