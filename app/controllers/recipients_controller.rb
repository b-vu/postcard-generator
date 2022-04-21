class RecipientsController < ApplicationController
    def index
        recipients = Recipient.all
        render json: recipients, status: :ok
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


    private

    def recipient_params
        params.permit(:first_name, :last_name, :institution_id)
    end
end
