class CreateTasks < ActiveRecord::Migration[5.2]
  def change
    create_table :tasks do |t|
      t.string :title, null: false
      t.text :description, null: false
      t.integer :priority, null: false
      t.integer :category, null: false
      t.integer :rate, null: false
      t.integer :parent_task_id
      t.timestamps
    end
  end
end
