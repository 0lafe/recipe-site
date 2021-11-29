class Api::V1::RecipesController < ApplicationController

    def index
        render json: Recipe.limit(10)
    end
end