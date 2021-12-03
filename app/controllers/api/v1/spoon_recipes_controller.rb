class Api::V1::SpoonRecipesController < ApplicationController

    def index
        render json: Spoonacular.get_by_name(params["search"], params["offset"], params["sort"])
    end

    def new
        render json: Spoonacular.get_search_params
    end

end