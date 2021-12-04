class SpoonacularTest < Spoonacular

    def self.get_data(url)
        if SpoonacularApiRequest.last.requests.to_i < MAX_REQUESTS
            file = File.read('testRecipes.json')
            parsed_response = JSON.parse(file)
            return parsed_response
        else 
            return {error: "Allocated API requests exceeded"}
        end
    end

end