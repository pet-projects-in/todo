class CreateToDoItems < ActiveRecord::Migration[6.0]
  def change
    create_table :to_do_items do |t|
      t.string :title, null: false
      t.boolean :completed, default: false
      t.string :user_id
      t.integer :list_id
      t.timestamps
    end
  end
end
