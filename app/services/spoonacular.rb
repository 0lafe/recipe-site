class Spoonacular

    SPOONACULAR_API_URL = "https://api.spoonacular.com/recipes/"
    API_ADDITION = "?apiKey=#{ENV["SPOONACULAR_API_KEY"]}"
    SEED_QUANTITY = 100
    #scaling factor is here to avoid floats and only use ints
    SCALING_FACTOR = 100
    MAX_REQUESTS = ENV["REQUEST_LIMIT"].to_i * SCALING_FACTOR

    def self.get_by_name(receivedData)
        type = "complexSearch"
        params = "&query=#{receivedData[:search]}"

        offset = ""
        if receivedData[:offset]
            offset = "&offset=#{receivedData[:offset]}"
        end

        sort = "popularity"
        if (receivedData[:sort])
            sort = "&sort=#{receivedData[:sort]}"
        end

        number = ""
        quantity = 10
        if (receivedData[:number])
            number = "&number=#{receivedData[:number]}"
            quantity = receivedData[:number].to_i
        end

        url = "#{SPOONACULAR_API_URL}#{type}#{API_ADDITION}#{params}#{offset}#{sort}#{number}"
        SpoonacularApiRequest.increase_calls((1 + (0.01 * quantity)) * SCALING_FACTOR)
        return get_data(url)
    end

    def self.get_by_id(id)
        type = "#{id}/information"
        url = "#{SPOONACULAR_API_URL}#{type}#{API_ADDITION}"
        SpoonacularApiRequest.increase_calls(1 * SCALING_FACTOR)
        return store_one_recipe(get_data(url))
    end

    def self.daily_random_seed
        type = "random"
        params = "&number=#{SEED_QUANTITY}"
        url = "#{SPOONACULAR_API_URL}#{type}#{API_ADDITION}#{params}"
        store_recipe_data(get_data(url)["recipes"])
        SpoonacularApiRequest.increase_calls((1 + 0.01 * SEED_QUANTITY) * SCALING_FACTOR)
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
        return Recipe.create(title: title, ingredients: ingredients.join(":=:"), instructions: instructions, api_id: recipe["id"], image: recipe["image"])
    end

    def self.get_data(url)
        if SpoonacularApiRequest.last.requests.to_i < MAX_REQUESTS
            api_response = Faraday.get(url)
            parsed_response = JSON.parse(api_response.body)
            return parsed_response
        else 
            return {error: "Allocated API requests exceeded"}
        end
    end

    def self.get_search_params
        params = ["popularity", "random", "healthiness", "selenium"]
        {params: params}
    end

end