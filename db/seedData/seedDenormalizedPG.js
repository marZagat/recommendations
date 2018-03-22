require('dotenv').config();

const pgp = require('pg-promise')({
  capSQL: true
});

const generate = require('./generatePGdata');

let host = process.env.POSTGRES_HOST;
let username = process.env.POSTGRES_USER;
let password = process.env.POSTGRES_PW;
let port = process.env.POSTGRES_PORT;

const db = pgp(`postgres://${username}:${password}@${host}:${port}/marzagat-denormalized`);

const csRestaurants = new pgp.helpers.ColumnSet([
  'restaurant_id',
  'name',
  'neighborhood',
  'zagat_rating',
  'google_rating', 
  'review_count',
  'description',
  'latitude',
  'longitude',
  'address',
  'website',
  'price_level',
  'type',
  'photo_url_1',
  'photo_url_2',
  'photo_url_3',
  'photo_url_4',
  'photo_url_5',
  'photo_url_6',
  'photo_url_7',
  'photo_url_8',
  'photo_url_9',
  'photo_url_10',
], {table: 'restaurants'});

const csNearby = new pgp.helpers.ColumnSet([
  'restaurant_id',
  'nearby_id',
  'nearby_rank'
], {table: 'nearby_restaurants'});

db.tx('inserting-restaurants', t => {
  return t.sequence(index => {
    return generate.restaurantData(index)
    .then(data => {
      if (data) {
        const insert = pgp.helpers.insert(data, csRestaurants);
        return t.none(insert);
      }
    });
  })
})
  .then((data) => {
    console.log('inserted restaurants');
    db.tx('inserting-nearby', t => {
      return t.sequence(index => {
        return generate.nearbyData(index)
        .then(data => {
          if (data) {
            const insert = pgp.helpers.insert(data, csNearby);
            return t.none(insert);
          }
        });
      })
    })
      .then((data) => {
        console.log('inserted nearby');
      })
      .catch(error => {
        console.log(error);
      })
      .then((data) => {
        console.log('inserted photos');
      })
      .catch(error => {
        console.log(error);
      })
  })
  .catch(error => {
    console.log(error);
  })
  