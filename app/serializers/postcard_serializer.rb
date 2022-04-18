class PostcardSerializer < ActiveModel::Serializer
  attributes :id, :message, :user_id, :recipient_id, :image
  include Rails.application.routes.url_helpers

  def image
    return unless object.image.attached?

    object.image.blob.attributes
      .slice("filename", "byte_size", "id")
      .merge(url: image_url(object.image))
  end

  def image_url(image)
    rails_blob_path(image, only_path: true)
  end
end

# Method to generate a smaller variant of the image blob and upload it to S3 bucket
# object.image.variant(resize_to_limit: [300, 300]).processed.url