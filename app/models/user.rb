class User < ApplicationRecord
    has_many :postcards
    has_many :recipients, through: :postcards
    has_secure_password

    validates :username, presence: true, uniqueness: true
    validates :my_email_attribute, email: true
    validates :first_name, presence: true
    validates :last_name, presence: true
end
