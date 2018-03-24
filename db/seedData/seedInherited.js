const generateBatch = require('./generateBatch');
const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';
const dbName = 'wegot';

MongoClient.connect(url, function(err, client) {
  console.log('connected successfully to server');

  const db = client.db(dbName);
  db.collection('inheritedrestaurants').drop();

  async function seedDB() {
    for (var x = 0; x < 100; x++) {
      await db.collection('inheritedrestaurants').insertMany(generateBatch(x));
      console.log('inserted 100k');
    }
    console.log('done');
    await db.collection('inheritedrestaurants').createIndex({ place_id: 1 }, function(err, result){
      console.log(result);
      callback(result);
    })
    client.close();
    console.log('db disconnected');  
  }

  seedDB().catch(error => console.error(error.stack));

})