class Recipient < ApplicationRecord
  has_many :postcards, dependent: :destroy
  has_many :users, through: :postcards
  belongs_to :institution
end
