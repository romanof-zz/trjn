class Firm < ActiveRecord::Base
  has_many   :milestones
  has_many   :transits
  belongs_to :author, classname: "User", foreign_key: "author_id"
end
