class Api::V1::RecipesController < ApplicationController

    def index
        render json: Recipe.limit(10)
    end

    def show
        render json: Recipe.find(params["id"])
    end
end