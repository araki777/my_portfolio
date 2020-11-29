class User < ApplicationRecord
  has_secure_password

  validates :name, presence: true
  validates :email, presence: true, uniqueness: true
  validates :bg_color_id, presence: true

  has_many :tasks
  has_many :group_users
  has_many :groups, through: :group_users
  has_many :messages

  enum role: { super_admin: 0, admin: 1, normal: 2, guest: 3 }

  def self.guest
    find_or_create_by!(name: 'guest', email: 'guest@example.com', bg_color_id: 1, role: 3) do |user|
      user.password = SecureRandom.urlsafe_base64
    end
  end
end
