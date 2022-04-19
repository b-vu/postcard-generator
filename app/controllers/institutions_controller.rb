class InstitutionsController < ApplicationController

    def index
        institutions = Institution.all
        render json: institutions, status: :ok
    end
    
    def create
        institution = Institution.create(institution_params)
            if institution.valid?
                render json: institution, status: :created
                session[:institution_id] = institution.id 
            else
                render json: {errors: institution.errors.full_messages}, status: :unprocessable_entity
            end
    end

    def show
    institution = Institution.find_by(id: session[:user_id])
        if institution
            render json: institution, status: :ok
        else
            render json: {error: "Not authorized"}, status: :unauthorized
        end
    end
    
    private
    
    def institution_params
        params.permit(:name, :email, :manager_name, :username, :password, :password_confirmation)
    end
        
end
