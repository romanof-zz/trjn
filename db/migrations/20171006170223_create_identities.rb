class CreateIdentities < ActiveRecord::Migration[5.0]
  def change
    create_table :identities do |t|
      t.string  :provider
      t.string  :user_id
      t.string  :external_id
      t.timestamps
    end
  end
end
