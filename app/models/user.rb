class User < ApplicationRecord
    has_many :postcards, dependent: :destroy
    has_many :recipients, through: :postcards
    has_secure_password

    validates :username, presence: true, uniqueness: true
    validates :email, email: true
    validates :first_name, presence: true
    validates :last_name, presence: true
end
