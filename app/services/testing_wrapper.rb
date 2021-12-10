class TestingWrapper

    def self.get_by_name(strong_params)
        if ENV["RAILS_ENV"] == "test"
            return SpoonacularTest.get_by_name(strong_params)
        else 
            return Spoonacular.get_by_name(strong_params)
        end
    end

    def self.get_by_id(id)
        if ENV["RAILS_ENV"] == "test"
            return SpoonacularTest.get_by_id(id)
        else 
            return Spoonacular.get_by_id(id)
        end
    end

end