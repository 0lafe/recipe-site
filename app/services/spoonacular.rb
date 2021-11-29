class Spoonacular

    SPOONACULAR_API_URL = "https://api.spoonacular.com/recipes/"
    API_ADDITION = "?apiKey=#{ENV["SPOONACULAR_API_KEY"]}"
    QUANTITY = 3
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
        # recipe = store_one_recipe(get_data(url))
        return store_one_recipe(get_data(url))
    end

    def self.daily_random_seed
        id_numbers = []
        QUANTITY.times { id_numbers << rand(750000) }
        ids = "&ids=#{id_numbers.join(",")}"
        url = "#{SPOONACULAR_API_URL}informationBulk#{API_ADDITION}#{ids}"
        store_recipe_data(File.read(TEST_JSON))
        SpoonacularApiRequest.increase_calls(1 + 0.5 * (QUANTITY-1))
    end

    def self.store_recipe_data(data)
        prased_json = JSON.parse(data)
        prased_json.each do |recipe|
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