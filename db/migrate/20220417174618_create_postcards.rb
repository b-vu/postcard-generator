class CreatePostcards < ActiveRecord::Migration[6.1]
  def change
    create_table :postcards do |t|
      t.string :message
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :recipient, null: false, foreign_key: true

      t.timestamps
    end
  end
end
