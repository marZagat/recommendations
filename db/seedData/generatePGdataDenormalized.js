const faker = require('faker');

const placeTypes = ['bakery', 'bar', 'cafe', 'restaurant', 'meal_delivery', 'meal_takeaway'];

function generateRestaurantDataBatch(round) {
  if (round % 100 === 0) {console.log(round);}
  if (round > 1000) {
    return Promise.resolve(null);
  }
  let data = [];
  let batchSize = 10000;
  for (var x = 0; x < batchSize; x++) {
    let restId = (batchSize * round) + x;
    let restaurantRow = generateRestaurantObj(restId);
    data.push(restaurantRow);
  }
  return Promise.resolve(data);
}

function generateRestaurantObj(restaurantId) {
  return {
    restaurant_id: restaurantId,
    name: faker.company.companyName(), 
    neighborhood: faker.address.streetName(),
    zagat_rating: faker.finance.amount(0, 5, 1),
    google_rating: faker.finance.amount(0, 5, 1),
    review_count: faker.random.number(100),
    description: faker.lorem.sentence(10),
    latitude: faker.address.latitude(),
    longitude: faker.address.longitude(),
    address: faker.address.streetAddress('###'),
    website: faker.internet.url(),
    price_level: faker.random.number(3) + 1,
    type: placeTypes[faker.random.number(5)],
    photo_url_1: 'https://picsum.photos/200/300?image=' + faker.random.number(1084),
    photo_url_2: 'https://picsum.photos/200/300?image=' + faker.random.number(1084),
    photo_url_3: 'https://picsum.photos/200/300?image=' + faker.random.number(1084),
    photo_url_4: 'https://picsum.photos/200/300?image=' + faker.random.number(1084),
    photo_url_5: 'https://picsum.photos/200/300?image=' + faker.random.number(1084),
    photo_url_6: 'https://picsum.photos/200/300?image=' + faker.random.number(1084),
    photo_url_7: 'https://picsum.photos/200/300?image=' + faker.random.number(1084),
    photo_url_8: 'https://picsum.photos/200/300?image=' + faker.random.number(1084),
    photo_url_9: 'https://picsum.photos/200/300?image=' + faker.random.number(1084),
    photo_url_10: 'https://picsum.photos/200/300?image=' + faker.random.number(1084)
  }
}

function generateNearbyDataBatch(round) {
  if (round > 10000) {
    return Promise.resolve(null);
  }
  let data = [];
  let batchSize = 1000;
  for (var x = 0; x < batchSize; x++) {
    let restId = (round * batchSize) + x;
    for (var y = 1; y < 7; y++) {
      let nearbyObj = generateNearbyObj(restId, y);
      data.push(nearbyObj);
    }
  }
  return Promise.resolve(data);
}

function generateNearbyObj(restId, nearbyRank) {
  return {
    restaurant_id: restId,
    nearby_id: faker.random.number(9999999),
    nearby_rank: nearbyRank
  }
}


module.exports.restaurantData = generateRestaurantDataBatch;
module.exports.nearbyData = generateNearbyDataBatch;
