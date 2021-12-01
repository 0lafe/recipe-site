namespace :recipes do |args|

    desc "clears users"
    task :clear_users => [ :environment ] do
        User.delete_all
        User.create(email: "admin@mail.com", password: "password", username: "admin")
    end

    desc "gets random recipes for the day"
    task :rng => [ :environment ] do
        Spoonacular.daily_random_seed
    end

    desc "recipe search"
    task :search => [ :environment ] do
        ARGV.each { |a| task a.to_sym do ; end }
        Spoonacular.get_by_name(ARGV[1])
    end

    desc "removes all recipes from the API"
    task :clear_recipes => [ :environment ] do
        Recipe.delete_all
    end

end