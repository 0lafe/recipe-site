class Api::V1::SpoonRecipesController < ApplicationController

    def index
        # render json: Spoonacular.get_by_name(params["search"], params["offset"], params["sort"])
        render json: Spoonacular.get_by_name(strong_params)
    end

    def new
        render json: Spoonacular.get_search_params
    end

    def strong_params
        params.permit(:search, :offset, :sort)
    end

end