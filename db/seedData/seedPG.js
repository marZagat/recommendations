const pgp = require('pg-promise')({
  capSQL: true
});
const faker = require('faker');

const db = pgp('postgres://postgres:testpw@localhost:5432/marzagat');

// db.connect()
//   .then(obj => {
//     console.log('connected!');
//   })
//   .catch(error => {
//     console.log('ERROR: ', error.message || error);
//   })

const cs = new pgp.helpers.ColumnSet([
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

// const data = [
//   {id: 1, 
//   name: 'test restaurant', 
//   neighborhood: 'test neighborhood',
//   zagat_rating: 3.4,
//   description: 'test description',
//   latitude: 65.2341,
//   longitude: 76.1234,
//   address: 'test address',
//   website: 'test website',
//   price_level: 2,
//   type: 'test type' 
//   },
//   {id: 2, 
//     name: 'test restaurant2', 
//     neighborhood: 'test neighborhood2',
//     zagat_rating: 1.2,
//     description: 'test description2',
//     latitude: 65.2341,
//     longitude: 76.1234,
//     address: 'test address2',
//     website: 'test website2',
//     price_level: 1,
//     type: 'test type2' 
//     },
// ];

const placeTypes = ['bakery', 'bar', 'cafe', 'restaurant', 'meal_delivery', 'meal_takeaway'];

function generateRestaurantDataBatch(round) {
  let data = [];
  for (var x = 0; x < 10000; x++) {
    let restaurantRow = {
      id: (1000 * round) + x,
      name: faker.company.companyName(), 
      neighborhood: faker.address.streetName(),
      zagat_rating: faker.finance.amount(0, 5, 1),
      description: faker.lorem.sentence(10),
      latitude: faker.address.latitude(),
      longitude: faker.address.longitude(),
      address: faker.address.streetAddress('###'),
      website: faker.internet.url(),
      price_level: faker.random.number(3),
      type: placeTypes[faker.random.number(5)]
    }
    data.push(restaurantRow);
  }
  return Promise.resolve(data);
}

db.task('inserting-products', t => {
  return generateRestaurantDataBatch(0)
    .then(data => {
      console.log(data.length);
      if (data) {
        const insert = pgp.helpers.insert(data, cs);
        return t.none(insert);
      }
    });
})
  .then((data) => {
    console.log('inserted batch');
  })
  .catch(error => {
    console.log(error);
  })