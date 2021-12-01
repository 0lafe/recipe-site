class Api::V1::UserFavoritesController < ApplicationController

    def create 
        if UserFavorite.exists?(user: current_user, recipe_id: params[:recipe])
            UserFavorite.where(user: current_user, recipe_id: params[:recipe])[0].delete
            render json: {success: "succeeded"}
        else
            new_favorite = UserFavorite.new(user: current_user, recipe_id: params[:recipe])
            if new_favorite.save
                render json: {success: "succeeded"}
            else 
                render json: {errors: new_favorite.errors.full_messages.to_sentence}
            end
        end
    end

end