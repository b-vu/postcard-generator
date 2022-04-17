class Institution < ApplicationRecord
    has_many :recipients
    has_secure_password
end
