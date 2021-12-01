class Api::V1::RecipesController < ApplicationController

    def index
        render json: Recipe.limit(6).order("RANDOM()")
    end

    def show
        if Recipe.exists?(api_id: params["id"])
            render json: Recipe.where(api_id: params["id"])
        else 
            render json: [Spoonacular.get_by_id(params["id"])]
        end
    end
end