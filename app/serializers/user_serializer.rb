class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :username, :recipes
  has_many :recipes
end
