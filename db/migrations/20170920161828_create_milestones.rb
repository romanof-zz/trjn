class CreateMilestones < ActiveRecord::Migration[5.0]
  def change
    create_table :milestones do |t|
      t.string  :name
      t.text    :location
      t.text    :description
      t.integer :journey_id
      t.timestamps
    end
  end
end
