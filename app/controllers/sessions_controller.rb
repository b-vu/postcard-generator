class SessionsController < ApplicationController
    def create
        user = User.find_by(username: params[:username])
        if user&.authenticate(params[:password])
            session[:user_id]= user.id 
            render json: user, status: :created
        else
            render json: {error: "Invalid username or password"}, status: :unauthorized
        end
    end

    def inst_create
        institution = Institution.find_by(username: params[:username])
        if institution&.authenticate(params[:password])
            session[:institution_id]= institution.id
            render json: institution, status: :created
        else
            render json: {error: "Invalid username or password"}, status: :unauthorized
        end
    end

    def destroy
        user = User.find_by(id: session[:user_id])
        if user
            session.delete :user_id
            head :no_content
        else
            render json: {error: "Invalid username or password"}, status: :unauthorized
        end
    end

    def inst_destroy
    institution = Institution.find_by(id: session[:institution_id])
        if institution
            session.delete :institution_id
            head :no_content
        else
            render json: {error: "Invalid username or password"}, status: :unauthorized
        end
    end
end
