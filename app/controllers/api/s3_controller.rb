class Api::S3Controller < ApplicationController
    def index        
        render json: {}, status: :ok
    end
end
