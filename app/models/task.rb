class Task < ApplicationRecord
  validates :title, presence: true, length: { maximum: 30 }
  validates :description, presence: true

  has_one_attached :image
  belongs_to :user

  scope :recent, -> { order(created_at: :desc) }
end
