class PostcardsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found

    def index
        postcards = Postcard.all.with_attached_image
        render json: postcards, status: :ok
    end

    def show
        render json: Postcard.find(params[:id]), status: :ok
    end

    def create
        if params[:method] == "upload"
            image = params[:image]
        else
            # Decoding the base-64 code that we got from converting the canvas element to an image file
            decoded_data = Base64.decode64(params[:image].split(',')[1])
            image = { 
                io: StringIO.new(decoded_data),
                content_type: 'image/png',
                filename: 'image.png'
            }
        end

        postcard = Postcard.create!({
            message: "Test",
            image: image,
            user_id: params[:user_id],
            recipient_id: params[:recipient_id]
        })
        render json: postcard, status: :created

        # byebug
        # render json: {}, status: :created
    end

    private

    def postcard_params
        params.permit(:message, :image, :user_id, :recipient_id)
    end

    def render_unprocessable_entity(exception)
        render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
    end

    def render_not_found
        render json: { error: "Postcard not found" }, status: :not_found
    end
end
