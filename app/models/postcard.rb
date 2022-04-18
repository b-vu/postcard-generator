class Postcard < ApplicationRecord
  belongs_to :user
  belongs_to :recipient
  has_one_attached :image

  validate :acceptable_image

  # Method for validating if an uploaded image is too big and if the file is in JPG or PNG format
  def acceptable_image
    return unless image.attached?
  
    unless image.byte_size <= 1.megabyte
      errors.add(:image, "file is too large")
    end
  
    acceptable_types = ["image/jpeg", "image/png"]
    unless acceptable_types.include?(image.content_type)
      errors.add(:image, "file must be a JPG or PNG")
    end
  end
end
