class Api::V1::SpoonRecipesController < ApplicationController

    def index
        render json: Spoonacular.get_by_name(params["search"], params["offset"])
    end

end