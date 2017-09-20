class CreateTransits < ActiveRecord::Migration[5.0]
  def change
    create_table :transits do |t|
      t.integer :type
      t.integer :start_milestone_id
      t.integer :end_milestone_id
      t.integer :journey_id
      t.text    :description
      t.float   :price
      t.integer :duration
      t.timestamps
    end
  end
end
