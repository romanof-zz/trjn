class CreateSessions < ActiveRecord::Migration[5.0]
  def change
    create_table :sessions do |t|
      t.string  :session_id
      t.string  :user_id
      t.string  :access_token
      t.timestamps
    end
  end
end
