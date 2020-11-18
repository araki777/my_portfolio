class Task < ApplicationRecord
  validates :title, presence: true, length: { maximum: 30 }
  validates :description, presence: true
  validates :priority, presence: true
  validates :category, presence: true
  validates :rate, presence: true

  has_one_attached :image
  belongs_to :user
end
