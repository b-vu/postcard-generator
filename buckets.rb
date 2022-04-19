require 'aws-sdk-s3'
require 'byebug'

s3 = Aws::S3::Resource.new(region: 'us-east-1')

# byebug

s3.buckets.first.objects.each do |obj|
    puts "  #{obj.key} => #{obj.etag}"
end