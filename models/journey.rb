class Journey < ActiveRecord::Base
  has_many   :milestones
  has_many   :transits
  belongs_to :author, class_name: "User", foreign_key: "author_id"
end
