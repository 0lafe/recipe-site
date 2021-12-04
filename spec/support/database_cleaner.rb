RSpec.configure do |config|

  # before each test suite, dump the database completely
  config.before(:suite) do
    DatabaseCleaner.clean_with(:truncation)
    SpoonacularApiRequest.delete_all
    SpoonacularApiRequest.create(requests: 0)
  end

  # “sets the default database cleaning strategy to be transactions”
  #
  config.before(:each) do
    DatabaseCleaner.strategy = :transaction
  end

  config.before(:each, :js => true) do
    DatabaseCleaner.strategy = :truncation
  end

  config.before(:each) do
    DatabaseCleaner.start
  end

  config.after(:each) do
    DatabaseCleaner.clean
  end
end
