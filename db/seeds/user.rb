5.times do |n|
  User.create!(
    name: "user#{n}",
    email: "user#{n}@example",
    password: "password",
    password_confirmation: "password"
  )
end
