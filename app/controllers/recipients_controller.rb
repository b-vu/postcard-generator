class RecipientsController < ApplicationController
    def index
        recipients = Recipient.all
        render json: recipients, status: :ok
    end

    def show
        recipient = Recipient.find(params[:id])
        if recipient
            render json: recipient, status: :ok
        else
            render json: { error: "Recipient not found" }, status: :not_found
        end
    end

    def create
        recipient = Recipient.create!(recipient_params)
        if recipient.valid?
            render json: recipient, status: :created
        else
            render json: {errors: user.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def recipients_collect
        recipients = Recipient.where(institution_id: session[:institution_id])
        render json: recipients
    end

    def update
        recipient = Recipient.find(params[:id])
        if recipient
            recipient.update(recipient_params)
            render json: recipient, status: :ok
        else
            render json: { error: "Recipient not found" }, status: :not_found
        end
    end

    def destroy
        recipient = Recipient.find(params[:id])
        if recipient
            recipient.destroy
            render json: {}, status: :ok
        else
            render json: { error: "Recipient not found" }, status: :not_found
        end
    end

    private

    def recipient_params
        params.permit(:first_name, :last_name, :institution_id)
    end
end
