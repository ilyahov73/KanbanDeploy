class CreateCards < ActiveRecord::Migration[7.0]
  def change
    create_table :cards do |t|
      t.text :title
      t.integer :position
      t.references :colomn, null: false, foreign_key: true
      
      t.timestamps
    end
  end
end
