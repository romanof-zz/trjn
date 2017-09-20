class CreateJourneys < ActiveRecord::Migration[5.0]
  def change
    create_table :journeys do |t|
      t.string  :title
      t.integer :people_count
      t.float   :budget
      t.float   :budget_min
      t.float   :budget_max
      t.float   :duration
      t.text    :description
      t.text    :location
      t.integer :author_id
      t.timestamps
    end
  end
end
