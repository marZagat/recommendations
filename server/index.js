require('newrelic');

const express = require('express');

const redis = require('redis');
const REDIS_PORT = 6379;

const app = express();
const client = redis.createClient(REDIS_PORT);
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

var restaurants = require('../db/models/restaurant.js');
var mongoose = require('mongoose');
const dbAddress = process.env.DB_ADDRESS || 'localhost';

var uri = `mongodb://${dbAddress}/wegot`;
mongoose.connect(uri, { useMongoClient: true });

app.use(cors());
app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, '../client/dist')));
app.use('/restaurants/:id', express.static(path.join(__dirname, '../client/dist')));

app.get('/api/restaurants/:id/recommendations', cache, function (req, res) {
  var placeId = req.params.id || 0;
  console.log("GET " + req.url);
  // find recommended restaurants based on id
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
