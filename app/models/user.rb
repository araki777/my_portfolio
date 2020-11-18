class User < ApplicationRecord
  has_secure_password

  validates :name, presence: true
  validates :email, presence: true, uniqueness: true
  validates :bg_color_id, presence: true

  has_many :tasks

  def self.guest
     find_or_create_by!(name: 'guest', email: 'guest@example.com') do |user|
       user.password = SecureRandom.urlsafe_base64
     end
   end
end
