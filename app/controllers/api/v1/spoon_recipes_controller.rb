class Api::V1::SpoonRecipesController < ApplicationController

    def index
        render json: TestingWrapper.get_by_name(strong_params)  
    end

    def new
        render json: Spoonacular.get_search_params
    end

    def strong_params
        params.permit(:search, :offset, :sort, :number)
    end

end