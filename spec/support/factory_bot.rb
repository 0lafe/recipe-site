require 'factory_bot'

FactoryBot.define do
  factory :user do
    sequence(:email) {|n| "user#{n}@example.com" }
    sequence(:username) { |n| "user#{n}" }
    password { 'password' }
    password_confirmation { 'password' }
  end

  factory :recipe do 
    title { 'Recipe' }
    ingredients { 'Ingredient' }
    instructions { 'instructions' }
    sequence(:api_id) { |n| "#{n}" }
  end

end
