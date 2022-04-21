class InstitutionSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :manager_name, :username
  has_many :recipients
end
