require './config/environment'

namespace :spoonAPI do |args|
    task :reset => [ :environment ] do
        SpoonacularApiRequest.delete_all
        SpoonacularApiRequest.create(requests: 0)
    end
end