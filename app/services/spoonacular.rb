class Spoonacular

    SPOONACULAR_API_URL = "https://api.spoonacular.com/recipes/"
    API_ADDITION = "?apiKey=#{ENV["SPOONACULAR_API_KEY"]}"
    QUANTITY = 100
    TEST_JSON = "testRecipes.json"

    def self.get_by_name(ingredient_name, offset=0)
        type = "complexSearch"
        params = "&query=#{ingredient_name}&offset=#{offset}"
        url = "#{SPOONACULAR_API_URL}#{type}#{API_ADDITION}#{params}"
        return get_data(url)
    end

    def self.get_by_id(id)
        type = "#{id}/information"
        url = "#{SPOONACULAR_API_URL}#{type}#{API_ADDITION}"
        SpoonacularApiRequest.increase_calls(1)
        return store_one_recipe(get_data(url))
    end

    def self.daily_random_seed
        type = "random"
        params = "&number=#{QUANTITY}"
        url = "#{SPOONACULAR_API_URL}#{type}#{API_ADDITION}#{params}"
        binding.pry
        store_recipe_data(get_data(url)["recipes"])
        SpoonacularApiRequest.increase_calls(1 + 0.5 * (QUANTITY-1))
    end

    def self.store_recipe_data(data)
        data.each do |recipe|
            store_one_recipe(recipe)
        end
    end

    def self.store_one_recipe(recipe)
        title = recipe["title"]
        ingredients = []
        recipe["extendedIngredients"].each do |ingredient|
            ingredients << ingredient["original"]
        end
        if recipe["instructions"].length > 0
            instructions = ActionView::Base.full_sanitizer.sanitize(recipe["instructions"])
        else 
            instructions = recipe["sourceUrl"]
        end
        return Recipe.create(title: title, ingredients: ingredients.join(":=:"), instructions: instructions, api_id: recipe["id"])
    end

    def self.get_data(url)
        api_response = Faraday.get(url)
        parsed_response = JSON.parse(api_response.body)
        return parsed_response
    end

end