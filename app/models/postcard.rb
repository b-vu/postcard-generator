class Postcard < ApplicationRecord
  belongs_to :recipient
  belongs_to :user
  has_one_attached :image
end
