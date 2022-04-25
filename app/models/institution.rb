class Institution < ApplicationRecord
    has_many :recipients
    has_secure_password

    validates :username, presence: true, uniqueness: true
    validates :email, email: true
    validates :name, presence: true, uniqueness: true
    validates :manager_name, presence: true
end
