# WeGot - Nearby-Recommendations
## Purpose
This service forms a part of the WeGot food review website. It renders 6 recommended restaurants based on proximity to the current restaurant selected showing basic information about a restaurant, including the name, description, type, neighborhood, price level, WeGot and Google reviews summary. Clicking on the restaurant will take you to the newly selected restaurant page.

## Description
The service is composed of a server, a  client, and a database.
### Server API
Serves static client files in response to a GET request to the root endpoint.
### Database
A MongoDB database that holds restaurant information.
### Client
Takes in a restaurant ID and requests restaurant information from the server. Renders the information.

## Getting Started
### Prerequisites
-npm
-node
-jest
-webpack
-MongoDB

### Google API Key
To seed the database for the application, you will need a Google API key.

You can get an API Key from Google here:
https://developers.google.com/maps/documentation/javascript/get-api-key

Duplicate config.example.js and rename it to config.js.
Replace the placeholder strings in your newly created config.js with your Google API key.

NOTE: You've now created the file referenced in seed.js as config.js that your app requires in order to seed the database.

### Installation
1. Install dependencies: `npm install`
2. Start database server: `npm run database`
3. Seed database: `npm run seed-database`
4. Run React Webpack:`npm run react-dev`
5. Start server: `npm start`

To start, in your browser navigate to: [http://localhost:3004](http://localhost:3004)

### Docker
This app can also be spun-up using Docker. The image for the recommendations server is created by the Dockerfile in this repo and can be created by running `docker build -t recommendations`. Alternately, the image can be downloaded from docker hub with the command `docker pull akaraca/marzagat_recommendations` (see hub.docker.com/r/akaraca/marzagat_recommendations/ for more information). 

To create all of the containers for the recommendation service, the docker-compose.yml file can be used with the command `docker-compose up`. This spins up the containers for the recommendations server, MongoDB, and Redis. After the containers have been created and the app is running on port 3004, you can seed the MongoDB volume. If your recommendations server container is named 'recommendations_recommendations1', then the command to seed the database is `docker exec -it recommendations_recommendations1 npm run seed-database`.

## Tests
Run: `npm test`

## Credits
This app was  built by another team as their Front End Capstone project and inherited as part of my team's System Design Capstone, where we improve upon the app's performance at web-scale. The front end for this service was created by @stacylin.