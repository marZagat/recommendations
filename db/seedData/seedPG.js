const pgp = require('pg-promise')({
  capSQL: true
});

const generate = require('./generatePGdata');

const db = pgp('postgres://postgres:testpw@localhost:5432/marzagat');

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
  'type'
], {table: 'restaurants'});

const csNearby = new pgp.helpers.ColumnSet([
  'restaurant_id',
  'nearby_id',
  'nearby_rank'
], {table: 'nearby_restaurants'});

const csPhotos = new pgp.helpers.ColumnSet([
  'photo_id',
  'restaurant_id',
  'photo_url'
], {table: 'restaurant_photos'})

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
    db.tx('inserting-photos', t => {
      return t.sequence(index => {
        return generate.photoData(index)
        .then(data => {
          if (data) {
            const insert = pgp.helpers.insert(data, csPhotos);
            return t.none(insert);
          }
        });
      })
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
  