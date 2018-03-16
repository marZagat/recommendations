const faker = require('faker');

const placeTypes = ['bakery', 'bar', 'cafe', 'restaurant', 'meal_delivery', 'meal_takeaway'];

function generateBatch(x) {
  let counter = 0 + (x * 100000);
  var newData = [];
  for (var y = 0; y < 100000; y++) {
    restaurant = {
      name: faker.company.companyName(),
      place_id: counter,
      google_rating: faker.finance.amount(0, 5, 1),
      zagat_food_rating: faker.finance.amount(0, 5, 1),
      review_count: faker.random.number(50),
      photos: [faker.image.food() + '/' + faker.random.number(10), 
        faker.image.food() + '/' + faker.random.number(10), 
        faker.image.food() + '/' + faker.random.number(10),
        faker.image.food() + '/' + faker.random.number(10), 
        faker.image.food() + '/' + faker.random.number(10), 
        faker.image.food() + '/' + faker.random.number(10),
        faker.image.food() + '/' + faker.random.number(10), 
        faker.image.food() + '/' + faker.random.number(10), 
        faker.image.food() + '/' + faker.random.number(10), 
        faker.image.food() + '/' + faker.random.number(10)],
      short_description: faker.lorem.sentence(10),
      neighborhood: faker.address.streetName(),
      location: {
        lat: faker.address.latitude(),
        long: faker.address.longitude()
      },
      address: faker.address.streetAddress('###'),
      website: faker.internet.url(),
      price_level: faker.random.number(4),
      types: [placeTypes[faker.random.number(6)]],
      nearby: [faker.random.number(100000),
        faker.random.number(100000),
        faker.random.number(100000),
        faker.random.number(100000),
        faker.random.number(100000),
        faker.random.number(100000)]
    }
    newData.push(restaurant);
    counter++;
  }
  return newData;
}

module.exports = generateBatch;
