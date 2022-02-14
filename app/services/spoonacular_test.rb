class SpoonacularTest < Spoonacular

    def self.get_data(url)
        if SpoonacularApiRequest.requests_left?
            file = File.read(ENV["TEST_FILE"])
            parsed_response = JSON.parse(file)
            return parsed_response
        else
            return {error: "Allocated API requests exceeded"}
        end
    end

end