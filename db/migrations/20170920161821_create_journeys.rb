class CreateJourneys < ActiveRecord::Migration[5.0]
  def change
    create_table :journeys do |t|
      t.string  :title
      t.integer :people_count
      t.integer :budget
      t.integer :budget_min
      t.integer :budget_max
      t.integer :duration
      t.text    :description
      t.text    :location
      t.integer :author_id
      t.timestamps
    end
  end
end
