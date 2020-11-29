class Task < ApplicationRecord
  validates :title, presence: true, length: { maximum: 30 }
  validates :description, presence: true
  validates :priority, presence: true
  validates :category, presence: true
  validates :rate, presence: true

  has_one_attached :image
  belongs_to :user

  Category_Name = {
    1 => "プログラミング",
    2 => "料理",
    3 => "運動",
    4 => "仕事"
  }

  Priority_Name = {
    1 => "高",
    2 => "中",
    3 => "低"
  }

  Rate_Name = {
    0 => "0%", 1 => "10%", 2 => "20%", 3 => "30%", 4 => "40%", 5 => "50%",
    6 => "60%", 7 => "70%", 8 => "80%", 9 => "90%", 10 => "100%"
  }
end
