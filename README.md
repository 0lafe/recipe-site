#Welcome to recipedia, a website for recipes

#Tips for running locally
 
Initially run ```bundle install && yarn install``` to prepare all dependencies

Run these commands to prepare the database
```
rails db:create && rails db:migrate && rails db:test:prepare
```

These commands will seed the database, and setup the API request db table
```
rake spoonAPI:reset && recipes:rng
```
descriptions for these are in ```rake --tasks```

running ```rails s``` and ```yarn run dev:client``` in another window will start running the site locally