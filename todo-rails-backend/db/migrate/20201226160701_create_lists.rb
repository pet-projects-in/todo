class CreateLists < ActiveRecord::Migration[6.0]
  def change
    create_table :lists do |t|
      t.string :title, default: "List"
      t.string :list_ulr, null: false
      t.timestamps
    end
  end
end
