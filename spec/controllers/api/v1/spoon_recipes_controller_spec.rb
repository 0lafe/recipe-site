require 'rails_helper'

describe Api::V1::SpoonRecipesController, type: :controller do

    describe "GET#index" do

        it "should return search results" do
            
            ENV['TEST_FILE'] = 'testRecipes.json'

            test_data = JSON.parse(File.read(ENV["TEST_FILE"]))

            search = "chicken"
            offset = 0
            sort = "random"

            get :index, params: {search: search, offset: offset, sort: sort}
            
            returned_json = JSON.parse(response.body)

            expect(response.status).to eq 200
            expect(response.content_type).to eq("application/json; charset=utf-8")

            expect(returned_json[0]["title"]).to eq(test_data[0]["title"])

        end

    end

end