class AddUserIdTasks < ActiveRecord::Migration[5.2]
  def change
    execute 'DELETE FROM tasks;'
    add_reference :tasks, :user, forign_key: true
  end
end
