require 'rails_helper'

TEST_RECIPE_SEED = 8

RSpec.describe Spoonacular, type: :model do

    describe "daily random seed" do

        it "seeds db with daily data" do

            ENV["TEST_FILE"] = "testSeed.json"

            test_data = JSON.parse(File.read(ENV["TEST_FILE"]))

            SpoonacularTest.daily_random_seed

            expect(Recipe.count).to eq(TEST_RECIPE_SEED)

            truth = true

            Recipe.all.each_with_index { |recipe, i|
                if !(recipe.title == test_data["recipes"][i]["title"]) 
                    truth = false
                end
            }

            expect(truth).to eq(true)

        end

    end

end