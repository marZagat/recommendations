const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';
const dbName = 'wegot';

MongoClient.connect(url, (err, client) => {
  if (err) {
    console.error(err);
  }

  const db = client.db(dbName);
  const collection = db.collection('inheritedrestaurants');

  const findDocForId = async(id) => {
    const start = Date.now();
    const doc = await collection.findOne({ place_id: id});
    const end = Date.now();
    return end - start;
  }

  const findNearbyDocsForId = async (id) => {
    const start = Date.now();
    const doc = await collection.findOne({ place_id: id});
    const nearby = await collection.find({ place_id: {$in:doc.nearby}}).toArray();
    const end = Date.now();
    // console.log(`Benchmark #${benchmarkNum}: found ${nearby.length} nearby docs for id ${id} in ${end-start} ms`);
    return end - start;
  }

  const findNearbyDocsForIdsInRange = async (first, last) => {
    const start = Date.now();
    for (var x = first; x < last; x++) {
      const doc = await collection.findOne({ place_id: x});
      const nearby = await collection.find({ place_id: {$in:doc.nearby}}).toArray();  
    }
    const end = Date.now();
    return end - start;
  }

  const findDocNTimes = async (id, n) => {
    const start = Date.now();
    for (var x = 0; x < n; x++) {
      await collection.findOne({ place_id: id});
    }
    let end = Date.now();
    return end - start;
  }

  const findDocsInRange = async (first, last) => {
    const start = Date.now();
    for (var x = first; x < last; x++) {
      await collection.findOne({ place_id: x});
    }
    let end = Date.now();
    return end - start;
  }

  const findDocsDivisibleBy500k = async() => {
    const start = Date.now();
    for (var x = 0; x < 10000000; x += 500000) {
      await collection.findOne({ place_id: x});
    }
    let end = Date.now();
    return end - start;
  }

  // NOTES: benchmarks 4,5,6, & 10 can take a very long time depending on if
  // indexes are built or not
  const benchmarkSuite = async () => {
    // Benchmark1: Retrieve the info for the restaurant with 
    // place_id / place_id 1234567 once.
    let benchmark1 = await findDocForId(1234567);
    console.log(`Benchmark 1: Found 1 doc with id 1234567 in ${benchmark1} ms`);

    // Benchmark2: Retrieve the info for the restaurant with 
    //  place_id / place_id 1234567 once, immediately 
    // after it has been queried.
    let benchmark2 = await findDocForId(1234567);
    console.log(`Benchmark 2: Found 1 doc with id 1234567 in ${benchmark2} ms`);

    // Benchmark3: Retrieve the info for the restaurant with 
    // place_id / place_id 1234567 10 times in a row.
    let benchmark3 = await findDocNTimes(1234567, 10);
    console.log(`Benchmark 3: Found 1 doc with id 1234567 10 times in ${benchmark3} ms`);

    // Benchmark4: Retrieve the info for the restaurant with 
    // place_id / place_id 1234567 100 times in a row.
    let benchmark4 = await findDocNTimes(1234567, 100);
    console.log(`Benchmark 4: Found 1 doc with id 1234567 100 times in ${benchmark4} ms`);

    // Benchmark5: Retrieve the info for the restaurant with 
    // place_id / place_id 1234567 1000 times in a row.
    let benchmark5 = await findDocNTimes(1234567, 1000);
    console.log(`Benchmark 5: Found 1 doc with id 1234567 1000 times in ${benchmark5} ms`);

    // Benchmark6: Retrieve all info for all 10M restaurants 
    // in the DB.
    let benchmark6 = await findDocsInRange(0, 10000000);
    console.log(`Benchmark 6: Found all 10M docs in ${benchmark6} ms`);

    // Benchmark7: Retrieve all info for all restaurants with 
    // ids divisible by 500,000
    let benchmark7 = await findDocsDivisibleBy500k();
    console.log(`Benchmark 7: Found docs with ids divisible by 500k in ${benchmark7} ms`);

    // Benchmark8: Retrieve all info for restaurant with 
    // place_id / place_id 5000001
    let benchmark8 = await findDocForId(5000001);
    console.log(`Benchmark 8: Found doc with id 5000001 in ${benchmark8} ms`);

    // Benchmark9: Retrieve the info for the the 6 closest
    // restaurants to the restaurant with id 5000002* key query 
    let benchmark9 = await findNearbyDocsForId(5000002);
    console.log(`Benchmark 9: Found nearby docs for restaurant with id 5000002 in ${benchmark9} ms`);

    // Benchmark10: Retrieve the info for the 6 closest restaurants 
    // to restaurants with the ids 5000025 - 5000050
    let benchmark10 = await findNearbyDocsForIdsInRange(5000025, 5000050);
    console.log(`Benchmark 10: Found nearby docs for restaurants with ids in range 5000025 - 5000050 in ${benchmark10} ms`);
  }

  benchmarkSuite();

})
