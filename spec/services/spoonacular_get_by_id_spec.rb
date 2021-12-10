require 'rails_helper'

describe "Spoonacular get by ID" do

    it "should persist and return the recipe with a given api ID" do

        ENV["TEST_FILE"] = "testGetID.json"

        returned_recipe = SpoonacularTest.get_by_id(0)

        expect(returned_recipe["title"]).to eq(Recipe.last.title)
        expect(returned_recipe["ingredients"]).to eq(Recipe.last.ingredients)
        expect(returned_recipe["instructions"]).to eq(Recipe.last.instructions)

    end

end