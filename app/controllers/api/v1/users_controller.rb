class Api::V1::UsersController < ApplicationController

    def index 
        if current_user 
          render json: current_user 
        else 
          render json: {}
        end 
    end
end