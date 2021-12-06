require 'rails_helper'

describe "get search results" do

    it "returns a set of recipes when searched" do

        ENV["TEST_FILE"] = "testRecipes.json"

        test_data = JSON.parse(File.read(ENV["TEST_FILE"]))

        params = {
            search: "chicken",
            offset: 0,
            sort: "random"
        }

        results = SpoonacularTest.get_by_name(params)

        expect(results[0]["title"]).to eq(test_data[0]["title"])

    end

end