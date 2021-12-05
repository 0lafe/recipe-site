class Api::V1::SpoonRecipesController < ApplicationController

    def index
        
        if ENV["RAILS_ENV"] == "test"
            render json: SpoonacularTest.get_by_name(strong_params)
        else 
            render json: Spoonacular.get_by_name(strong_params)
        end
        
    end

    def new
        render json: Spoonacular.get_search_params
    end

    def strong_params
        params.permit(:search, :offset, :sort)
    end

end