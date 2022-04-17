class Recipient < ApplicationRecord
  has_many :postcards
  has_many :users, through: :postcards
  belongs_to :institution
end
