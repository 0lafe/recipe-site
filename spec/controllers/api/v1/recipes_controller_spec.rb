require 'rails_helper'

TEST_ID = 12

describe Api::V1::RecipesController, type: :controller do

    describe "GET#index" do

        it "should return 6 random results" do
            
            12.times do 
                create(:recipe)
            end

            get :index
            
            returned_json = JSON.parse(response.body)

            expect(response.status).to eq 200
            expect(response.content_type).to eq("application/json; charset=utf-8")

            expect(returned_json.length).to eq(6)

        end

    end

    describe "get#show" do

        let!(:recipe) { create(:recipe) }

        it "should return a recipe stored when exists" do

            get :show, params: {id: recipe.api_id}

            returned_json = JSON.parse(response.body)

            expect(response.status).to eq 200
            expect(response.content_type).to eq("application/json; charset=utf-8")

            expect(returned_json["recipe"]["title"]).to eq(recipe.title)
            expect(returned_json["recipe"]["ingredients"]).to eq(recipe.ingredients)
            expect(returned_json["recipe"]["instructions"]).to eq(recipe.instructions)

        end

        it "should return a recipe from spoonacular when recipe isn't stored" do

            ENV["TEST_FILE"] = "testGetID.json"

            get :show, params: {id: recipe.api_id + 1}

            returned_json = JSON.parse(response.body)

            test_recipe = JSON.parse(File.read(ENV["TEST_FILE"]))

            expect(response.status).to eq 200
            expect(response.content_type).to eq("application/json; charset=utf-8")

            expect(returned_json["recipe"]["title"]).to eq(test_recipe["title"])
            expect(returned_json["recipe"]["api_id"]).to eq(test_recipe["id"])
            
        end

    end

end