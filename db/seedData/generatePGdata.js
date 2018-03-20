const faker = require('faker');

const placeTypes = ['bakery', 'bar', 'cafe', 'restaurant', 'meal_delivery', 'meal_takeaway'];

function generateRestaurantDataBatch(round) {
  if (round % 100 === 0) {console.log(round);}
  if (round > 1000) {
    return Promise.resolve(null);
  }
  let data = [];
  for (var x = 0; x < 10000; x++) {
    let restId = (10000 * round) + x;
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
    type: placeTypes[faker.random.number(5)]
  }
}

function generateNearbyDataBatch(round) {
  if (round > 6002) {
    return Promise.resolve(null);
  }
  let data = [];
  let numIds = setNumIds(round);
  for (var x = 0; x < numIds; x++) {
    let restId = (round * 1666) + x;
    for (var y = 1; y < 7; y++) {
      let nearbyObj = generateNearbyObj(restId, y);
      data.push(nearbyObj);
    }
  }
  return Promise.resolve(data);
}

function setNumIds(round){
  if (round !== 6002) {
    return 1666;
  } else {
    return 668;
  }
}

function generateNearbyObj(restId, nearbyRank) {
  return {
    restaurant_id: restId,
    nearby_id: faker.random.number(9999999),
    nearby_rank: nearbyRank
  }
}

function generatePhotoDataBatch(round) {
  if (round > 10000) {
    return Promise.resolve(null);
  }
  let numPhotos = setNumPhotos(round);
  let data = [];
  for (var x = 0; x < 1000; x++) {
    let restId = (round * 1000) + x;
    for (var y = 0; y < numPhotos; y++) {
      let photoId = restId * 10 + y;
      let photoObj = generatePhotoObj(photoId, restId);
      data.push(photoObj);
    }
  }
  return Promise.resolve(data);
}

function generatePhotoObj(photoId, restId) {
  return {
    photo_id: photoId,
    restaurant_id: restId,
    photo_url: 'https://picsum.photos/200/300?image=' + faker.random.number(1084)
  }
}

function setNumPhotos(round) {
  if (round < 1000) {
    return 4;
  } else if (round < 2000) {
    return 6;
  } else {
    return 2;
  }
}1

module.exports.restaurantData = generateRestaurantDataBatch;
module.exports.nearbyData = generateNearbyDataBatch;
module.exports.photoData = generatePhotoDataBatch;
