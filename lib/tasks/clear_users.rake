

namespace :recipes do

    desc "clears users"
    task :clear_user do
        User.delete_all
    end
end