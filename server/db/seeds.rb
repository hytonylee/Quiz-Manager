# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
PASSWORD = 'supersecret'

User.destroy_all

super_user = User.create(
  first_name: 'Admin',
  last_name: 'User',
  email: 'admin@gmail.com',
  password: PASSWORD,
  is_admin: true
)

5.times.each do
  first_name = Faker::Name.first_name
  last_name = Faker::Name.last_name

  User.create(
    first_name: first_name,
    last_name: last_name,
    email: "#{first_name.downcase}.#{last_name.downcase}@example.com",
    password: PASSWORD
  )
end
# testins
users = User.all

puts Cowsay.say "Created #{users.count} users", :tux
puts "Login as admin #{super_user.email} and password of '#{PASSWORD}'"
