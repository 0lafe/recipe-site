class SpoonacularApiRequest < ApplicationRecord

    validates :requests, numericality: { only_integer: true }

    def self.increase_calls(quantity)
        SpoonacularApiRequest.create(requests: (SpoonacularApiRequest.last.requests + quantity.to_i))
    end
    
end