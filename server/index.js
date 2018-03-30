require('newrelic');

require('dotenv').config();
const express = require('express');

const redis = require('redis');
const REDIS_PORT = 6379;
const REDIS_ADDRESS = process.env.REDIS_ADDRESS || 'localhost';
console.log('REDIS_ADDRESS: ', REDIS_ADDRESS);

const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

let client;

const connect = async () => {
  client = await redis.createClient({
    host: REDIS_ADDRESS
  });
  client.on('error', error => console.error(error));
}

connect();

var restaurants = require('../db/models/restaurant.js');
var mongoose = require('mongoose');
const dbAddress = process.env.MONGO_ADDRESS || 'localhost';

var uri = `mongodb://${dbAddress}/marzagat`;
mongoose.connect(uri, { useMongoClient: true });

app.use(cors());
app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, '../public')));
app.use('/restaurants/:id', express.static(path.join(__dirname, '../client/dist')));

app.get('/api/restaurants/:id/recommendations', cache, function (req, res) {
  var placeId = req.params.id || 0;
  console.log("GET " + req.url);
  var results = [];
  restaurants.findOne(placeId, (err, data)=> {
    if(err){
      res.status(500);
      console.log(err);
    } else{
      var nearbyArr = data[0].nearby;
      results.push(data[0]);

      restaurants.findMany(nearbyArr, (err, data)=> {
        if(err){
          res.status(500);
          console.log(err);
        } else{
          results.push(data)
          res.status(200);
          client.setex(placeId, 3600, JSON.stringify(results));
          res.send(results);
        }
      });
    }
  });
});

function cache(req, res, next) {
  const placeId = req.params.id;
  client.get(placeId, function (err, data) {
    if (data !== null) {
      console.log('found cached info!')
      let parsedData= JSON.parse(data);
      res.send(parsedData);
    } else {
      next();
    }
  })
}


app.listen(3004, function () { console.log('WeGot app listening on port 3004!') });
