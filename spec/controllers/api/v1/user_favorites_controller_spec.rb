require 'rails_helper'

describe Api::V1::UserFavoritesController, type: :controller do
    let!(:recipe) { create(:recipe) }
    let!(:user) { create(:user) }

    describe "GET#create" do
        it "should add a favorite when none exists" do

            sign_in user
            get :create, params: {recipe: recipe.id}

            returned_json = JSON.parse(response.body)

            expect(response.status).to eq 200
            expect(response.content_type).to eq("application/json; charset=utf-8")

            expect(returned_json["success"]).to eq("succeeded")

            expect(UserFavorite.last.user).to eq(user)
            expect(UserFavorite.last.recipe).to eq(recipe)
        end

        it "should delete a favorite when one exists" do

            UserFavorite.create(recipe: recipe, user: user)

            sign_in user
            get :create, params: {recipe: recipe.id}

            returned_json = JSON.parse(response.body)

            expect(response.status).to eq 200
            expect(response.content_type).to eq("application/json; charset=utf-8")

            expect(returned_json["success"]).to eq("succeeded")

            expect(UserFavorite.count).to eq(0)
        end

    end

end