const pgp = require('pg-promise')({
  capSQL: true
});
const faker = require('faker');

const db = pgp('postgres://postgres:testpw@localhost:5432/marzagat');

const csRestaurants = new pgp.helpers.ColumnSet([
  'id',
  'name',
  'neighborhood',
  'zagat_rating',
  'description',
  'latitude',
  'longitude',
  'address',
  'website',
  'price_level',
  'type'
], {table: 'restaurants'});

const csReviews = new pgp.helpersColumnSet([
  'review_id',
  'restaurant_id',
  'review',
  'rating'
])

const placeTypes = ['bakery', 'bar', 'cafe', 'restaurant', 'meal_delivery', 'meal_takeaway'];

function generateRestaurantDataBatch(round) {
  console.log(round);
  if (round > 1000) {
    return Promise.resolve(null);
  }
  let data = [];
  for (var x = 0; x < 10000; x++) {
    let restaurantRow = {
      id: (10000 * round) + x,
      name: faker.company.companyName(), 
      neighborhood: faker.address.streetName(),
      zagat_rating: faker.finance.amount(0, 5, 1),
      description: faker.lorem.sentence(10),
      latitude: faker.address.latitude(),
      longitude: faker.address.longitude(),
      address: faker.address.streetAddress('###'),
      website: faker.internet.url(),
      price_level: faker.random.number(3) + 1,
      type: placeTypes[faker.random.number(5)]
    }
    data.push(restaurantRow);
  }
  return Promise.resolve(data);
}

db.tx('inserting-reviews', t => {
  return t.sequence(index => {
    return generateRestaurantDataBatch(index)
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
  })
  .catch(error => {
    console.log(error);
  })


function generateReviewDataBatch(round) {
  console.log(round);
  if (round > 24999) {
    return Promise.resolve(null);
  }
  let data = [];
  for (var x = 0; x < 400; x++) {
    let restId = (400 * round) + x;
    let numReviews = faker.random.number(25) + 1;
    for (var y = 0; y < numReviews; y++) {
      let reviewRow = {
        review_id: (25 * restId) + y,
        restaurant_id: restId,
        review: faker.lorem.sentences(3,2),
        rating: faker.random.number(5)
      }
      data.push(reviewRow);
    }
  }
  return Promise.resolve(data);
}

db.tx('inserting-reviews', t => {
  return t.sequence(index => {
    return generateReviewDataBatch(index)
    .then(data => {
      if (data) {
        const insert = pgp.helpers.insert(data, csReviews);
        return t.none(insert);
      }
    });
  })
})
  .then((data) => {
    console.log('inserted reviews');
  })
  .catch(error => {
    console.log(error);
  })
