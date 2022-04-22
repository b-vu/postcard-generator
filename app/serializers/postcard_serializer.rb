class PostcardSerializer < ActiveModel::Serializer
  attributes :id, :message, :user_id, :recipient_id, :image, :user_fullname
  include Rails.application.routes.url_helpers

  # Creates attributes that are attached to the image property of the postcard
  def image
    return unless object.image.attached?

    object.image.blob.attributes
      .slice("filename", "byte_size", "id")
      .merge(url: image_url(object.image))
  end

  # Creates the image URL from the blob to the S3 bucket
  def image_url(image)
    rails_blob_path(image, only_path: true)
  end

  def user_fullname
    "#{object.user.first_name} #{object.user.last_name}"
  end
end

# Method to generate a smaller variant of the image blob and upload it to S3 bucket
# variant, processed, and url methods are available because of the image_processing gem
# object.image.variant(resize_to_limit: [300, 300]).processed.url