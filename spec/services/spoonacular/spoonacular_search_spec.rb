require 'rails_helper'

RSpec.describe Spoonacular, type: :model do

    describe "get search results" do

        it "returns a set of recipes when searched" do

            ENV["TEST_FILE"] = "testSearch.json"

            test_data = JSON.parse(File.read(ENV["TEST_FILE"]))

            params = {
                search: "chicken",
                offset: 0,
                sort: "random"
            }

            results = SpoonacularTest.get_by_name(params)

            expect(results[0]["title"]).to eq(test_data[0]["title"])

        end

        it "should increase API calls by the correct amount" do

            ENV["TEST_FILE"] = "testSearch.json"

            test_data = JSON.parse(File.read(ENV["TEST_FILE"]))

            params = {
                search: "chicken",
                number: 1
            }

            SpoonacularTest.get_by_name(params)

            expect(SpoonacularApiRequest.current).to eq(101)

        end

        it "should fail when api calls are too high" do

            SpoonacularApiRequest.reset
            SpoonacularApiRequest.increase_calls(SpoonacularApiRequest.limit)

            params = { search: "chicken" }

            results = SpoonacularTest.get_by_name(params)
            expect(results[:error]).to eq("Allocated API requests exceeded")

        end

    end
end