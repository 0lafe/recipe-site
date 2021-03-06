require './config/environment'

namespace :spoonAPI do |args|
    
    task :reset => [ :environment ] do
        SpoonacularApiRequest.reset
    end

    task :set => [ :environment ] do
        ARGV.each { |a| task a.to_sym do ; end }
        SpoonacularApiRequest.create(requests: ARGV[1])
    end

end