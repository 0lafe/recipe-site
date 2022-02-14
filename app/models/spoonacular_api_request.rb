#used to keep track of requests made to the spoonacular API
class SpoonacularApiRequest < ApplicationRecord

    @@scaling_factor = 100

    validates :requests, numericality: { only_integer: true }

    def self.increase_calls(quantity)
        SpoonacularApiRequest.create(requests: (SpoonacularApiRequest.last.requests + quantity.to_i))
    end

    def self.reset
        SpoonacularApiRequest.delete_all
        SpoonacularApiRequest.create(requests: 0)
    end

    def self.current
        SpoonacularApiRequest.last.requests
    end

    def self.limit
        ENV["REQUEST_LIMIT"].to_i * @@scaling_factor
    end

    def self.search(number)
        increase_calls((1 + (0.01 * number)) * @@scaling_factor)
    end
    
    def self.get_by_id
        increase_calls(1 * @@scaling_factor) 
    end

    def self.requests_left?
        current() <= limit()
    end
end