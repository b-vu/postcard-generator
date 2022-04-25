class UsersController < ApplicationController
    def create
        user = User.create(user_params)
        if user.valid?
            render json: user, status: :created
            session[:user_id] = user.id 
        else
            render json: {errors: user.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def show
        user = User.find_by(id: session[:user_id])
        if user
            render json: user, status: :ok
        else
            render json: {error: "Not authorized"}, status: :unauthorized
        end
    end

    def show_user
        user = User.find_by(id: params[:id])
        render json: user, status: :ok
    end

    private

    def user_params
        params.permit(:username, :password, :password_confirmation, :email, :first_name, :last_name)
    end
end
