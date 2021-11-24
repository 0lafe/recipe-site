class CreateSpoonacularApiRequests < ActiveRecord::Migration[6.1]
  def change
    create_table :spoonacular_api_requests do |t|
      t.integer :requests, null: false
      t.timestamps
    end
  end
end
