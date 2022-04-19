class Postcard < ApplicationRecord
  belongs_to :user
  belongs_to :recipient
  has_one_attached :image
end
