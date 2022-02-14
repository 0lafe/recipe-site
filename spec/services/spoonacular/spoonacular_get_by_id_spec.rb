require 'rails_helper'

RSpec.describe Spoonacular, type: :model do

    describe "Spoonacular get by ID" do

        it "should persist and return the recipe with a given api ID" do

            ENV["TEST_FILE"] = "testGetID.json"

            returned_recipe = SpoonacularTest.get_by_id(0)

            expect(returned_recipe["title"]).to eq(Recipe.last.title)
            expect(returned_recipe["ingredients"]).to eq(Recipe.last.ingredients)
            expect(returned_recipe["instructions"]).to eq(Recipe.last.instructions)

        end

        it "should increase API calls by the correct amount" do

            ENV["TEST_FILE"] = "testGetID.json"

            returned_recipe = SpoonacularTest.get_by_id(0)

            expect(SpoonacularApiRequest.current).to eq(100)

        end

        it "should fail when api calls are too high" do

            SpoonacularApiRequest.reset
            SpoonacularApiRequest.increase_calls(SpoonacularApiRequest.limit)

            response = SpoonacularTest.get_by_id(0)

            expect(response[:error]).to eq("Allocated API requests exceeded")

        end

    end

end