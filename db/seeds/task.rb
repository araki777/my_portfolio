users = User.all
30.times do
  title = Faker::JapaneseMedia::SwordArtOnline.game_name
  description = Faker::JapaneseMedia::SwordArtOnline.location
  users.each { |user| user.tasks.create!(title: title, description: description) }
end
