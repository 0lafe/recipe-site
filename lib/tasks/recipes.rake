require_relative '../spoonacular/spoonacular.rb'

namespace :recipes do

    desc "clears users"
    task :clear_users => [ :environment ] do
        User.delete_all
        User.create(email: "admin@mail.com", password: "password", username: "admin")
    end

    desc "gets random recipes for the day"
    task :rng => [ :environment ] do
        Spoonacular.daily_random_seed
    end

end