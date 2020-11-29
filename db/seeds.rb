# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

users = User.all

# todoタスク
# 15.times do
#     title = Faker::Beer.brand
#     description = Faker::Movies::BackToTheFuture.quote
#     users.each { |user| user.tasks.create!(title: title, description:description) }
# end

# ユーザー
User.create!(
  [
    {
      name: 'panda',
      email: 'panda@example',
      password: 'password',
      password_confirmation: 'password',
      bg_color_id: 1
    },
    {
      name: 'rakuda',
      email: 'rakuda@example.com',
      password: 'password',
      password_confirmation: 'password',
      bg_color_id: 1
    },
    {
      name: 'tamanegi',
      email: 'tamanegi@example.com',
      password: 'password',
      password_confirmation: 'password',
      bg_color_id: 1
    },
  ]
)
