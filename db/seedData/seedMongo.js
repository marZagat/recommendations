require('dotenv').config();

const generateBatch = require('./generateBatch');
const MongoClient = require('mongodb').MongoClient;

const dbHost = process.env.MONGO_ADDRESS;
const url = `mongodb://${dbHost}:27017`;
const dbName = process.env.MONGO_DB_NAME;

MongoClient.connect(url, function(err, client) {
  console.log('connected successfully to server');

  const db = client.db(dbName);
  db.collection('restaurants').drop();

  async function seedDB() {
    for (var x = 0; x < 100; x++) {
      await db.collection('restaurants').insertMany(generateBatch(x));
      console.log('inserted 100k');
    }
    console.log('done');
    await db.collection('restaurants').createIndex({ place_id: 1 }, function(err, result){
      console.log(result);
    })
    client.close();
    console.log('db disconnected');  
  }

  seedDB().catch(error => console.error(error.stack));

})