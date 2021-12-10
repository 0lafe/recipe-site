#Welcome to recipedia, a website for recipes

#Tips for running locally

Required Ruby version: ```3.0.2```

Initially run ```bundle install && yarn install``` to prepare all dependencies

Run these commands to prepare the database
```
rails db:create && rails db:migrate && rails db:test:prepare
```

These commands will seed the database, and setup the API request db table
```
rake spoonAPI:reset && rake recipes:rng
```
descriptions for these are in ```rake --tasks```

running ```rails s``` and ```yarn run dev:client``` in another window will start running the site locally

TODO

Add a forum section for users to create posts and comments

Possibly implement data anylitics for API requests

Allow users to comment on Recipes