require('newrelic');

require('dotenv').config();
const express = require('express');


const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

var restaurants = require('../db/models/restaurant.js');
var mongoose = require('mongoose');
const dbAddress = process.env.MONGO_ADDRESS || 'localhost';

var uri = `mongodb://${dbAddress}/marzagat`;
mongoose.connect(uri, { useMongoClient: true });

app.use(cors());
app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, '../public')));
app.use('/restaurants/:id', express.static(path.join(__dirname, '../client/dist')));

app.get('/api/restaurants/:id/recommendations', function (req, res) {
  var placeId = req.params.id || 0;
  console.log("GET " + req.url);
  var results = [];
  restaurants.findOne(placeId, (err, data)=> {
    if(err){
      res.status(500);
      console.log(err);
    } else {
      var nearbyArr = data[0].nearby;
      results.push(data[0]);

      restaurants.findMany(nearbyArr, (err, data)=> {
        if(err){
          res.status(500);
          console.log(err);
        } else{
          results.push(data)
          res.status(200);
          res.send(results);
        }
      });
    }
  });
});




app.listen(3004, function () { console.log('WeGot app listening on port 3004!') });
