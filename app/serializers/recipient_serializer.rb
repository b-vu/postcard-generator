class RecipientSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :institution_id
  has_many :postcards
end
