class CreatePostcards < ActiveRecord::Migration[6.1]
  def change
    create_table :postcards do |t|
      t.references :recipient, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.string :message

      t.timestamps
    end
  end
end
