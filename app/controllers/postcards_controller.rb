class PostcardsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity

    def index
        postcards = Postcard.all.with_attached_image
        render json: postcards, status: :ok
    end

    def create
        # postcard = Postcard.create!(postcard_params)

        # Testing with hard coded params
        # postcard = Postcard.create!({
        #     message: "Test",
        #     image: params[:image],
        #     user_id: 1,
        #     recipient_id: 1
        # })
        # render json: postcard, status: :created

        byebug
        render json: {}, status: :created
    end

    private

    def postcard_params
        params.permit(:message, :image, :user_id, :recipient_id)
    end

    def render_unprocessable_entity(exception)
        render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
    end
end
