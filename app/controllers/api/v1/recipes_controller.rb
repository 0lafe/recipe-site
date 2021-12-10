class Api::V1::RecipesController < ApplicationController

    def index
        render json: Recipe.limit(6).order("RANDOM()")
    end

    def show
        if Recipe.exists?(api_id: params["id"])
            recipe = Recipe.where(api_id: params["id"])[0]
            render json: {recipe: recipe, favorited: UserFavorite.exists?(user: current_user, recipe: recipe)}
        else 
            render json: {recipe: TestingWrapper.get_by_id(params["id"]), favorited: false}
        end
    end

end