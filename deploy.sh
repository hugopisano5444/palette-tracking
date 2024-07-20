#!/bin/bash

# Login to Heroku
echo "Logging into Heroku..."
echo "$HEROKU_API_KEY" | heroku auth:token
heroku container:login

# Push the Docker image to Heroku
echo "Deploying to Heroku..."
heroku container:push web --app your-heroku-app-name
heroku container:release web --app your-heroku-app-name

echo "Deployment completed."
