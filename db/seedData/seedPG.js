const pgp = require('pg-promise')({
  capSQL: true
});

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

const data = [
  {id: 1, 
  name: 'test restaurant', 
  neighborhood: 'test neighborhood',
  zagat_rating: 3.4,
  description: 'test description',
  latitude: 65.2341,
  longitude: 76.1234,
  address: 'test address',
  website: 'test website',
  price_level: 2,
  type: 'test type' 
  },
  {id: 2, 
    name: 'test restaurant2', 
    neighborhood: 'test neighborhood2',
    zagat_rating: 1.2,
    description: 'test description2',
    latitude: 65.2341,
    longitude: 76.1234,
    address: 'test address2',
    website: 'test website2',
    price_level: 1,
    type: 'test type2' 
    },
];

db.task('inserting-products', t => {
  const insert = pgp.helpers.insert(data, cs);
  return t.none(insert);
})
  .then(() => {
    console.log('success, inserted 2 rows')
  })
  .catch(error => {
    console.log(error);
  })