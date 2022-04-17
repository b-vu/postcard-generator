class CreateInstitutions < ActiveRecord::Migration[6.1]
  def change
    create_table :institutions do |t|
      t.string :name
      t.string :email
      t.string :manager_name
      t.string :username
      t.string :password_digest

      t.timestamps
    end
  end
end
