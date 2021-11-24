class Spoonacular

    SPOONACULAR_API_URL = "https://api.spoonacular.com/recipes/"
    API_ADDITION = "?apiKey=#{ENV["SPOONACULAR_API_KEY"]}"
    QUANTITY = 3
    TEST_JSON = "testRecipes.json"

    def self.get_by_name(ingredient_name)

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
            title = recipe["title"]
            ingredients = []
            recipe["extendedIngredients"].each do |ingredient|
                ingredients << ingredient["original"]
            end
            if recipe["instructions"].length > 0
                instructions = recipe["instructions"]
            else 
                instructions = recipe["sourceUrl"]
            end
            Recipe.create(title: title, ingredients: ingredients.join(", "), instructions: instructions)
        end
    end

end