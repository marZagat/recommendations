const { Pool, Client } = require('pg');

const pool = new Pool();

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'marzagat',
  port: 5432,
  password: 'testpw'
});

const connect = async () => {
  await client.connect();

  async function findRowForId(x) {
    let start = Date.now();
    await client.query(`SELECT * FROM restaurants WHERE restaurant_id = ${x}`);
    let end = Date.now();
    return end - start;
  }

  async function findRowNTimes(x, n) {
    let start = Date.now();
    for (var x = 0; x < n; x++) {
      await client.query(`SELECT * FROM restaurants WHERE restaurant_id = ${x}`);
    }
    let end = Date.now();
    return end - start;
  }

  async function findRowsFromRange(first, last) {
    let start = Date.now();
    for (var x = first; x < last; x++) {
      await client.query(`SELECT * FROM restaurants WHERE restaurant_id = ${x}`);
    }
    let end = Date.now();
    return end - start;
  }

  async function findRowsDivisbleBy500k() {
    let start = Date.now();
    for (var x = 0; x < 10000000; x += 500000) {
      await client.query(`SELECT * FROM restaurants WHERE restaurant_id = ${x}`);
    }
    let end = Date.now();
    return end - start;
  }

  async function findNearbyRowsForId(x) {
    let start = Date.now();
    await client.query(`SELECT * FROM restaurants
        WHERE restaurant_id IN (
          SELECT nearby_id FROM nearby_restaurants
            WHERE restaurant_id = ${x})`);
    let end = Date.now();
    return end - start;
  }

  async function findNearbyRowsForIdsInRange(first, last) {
    let start = Date.now();
    for (var x = first; x < last; x++) {
      await findNearbyRowsForId(x);
    }
    let end = Date.now();
    return end - start;
  }
  
  // Benchmark1: Retrieve the info for the restaurant with 
  // place_id / place_id 1234567 once.
  let benchmark1 = await findRowForId(1234567);
  console.log(`Benchmark 1: Found 1 row with id 1234567 in ${benchmark1} ms`);

  // Benchmark2: Retrieve the info for the restaurant with 
  //  place_id / place_id 1234567 once, immediately 
  // after it has been queried.
  let benchmark2 = await findRowForId(1234567);
  console.log(`Benchmark 2: Found 1 row with id 1234567 in ${benchmark2} ms`);

  // Benchmark3: Retrieve the info for the restaurant with 
  // place_id / place_id 1234567 10 times in a row.
  let benchmark3 = await findRowNTimes(1234567, 10);
  console.log(`Benchmark 3: Found 1 row with id 1234567 10 times in ${benchmark3} ms`);

  // Benchmark4: Retrieve the info for the restaurant with 
  // place_id / place_id 1234567 100 times in a row.
  let benchmark4 = await findRowNTimes(1234567, 100);
  console.log(`Benchmark 4: Found 1 row with id 1234567 100 times in ${benchmark4} ms`);

  // Benchmark5: Retrieve the info for the restaurant with 
  // place_id / place_id 1234567 1000 times in a row.
  // let benchmark5 = await findRowNTimes(1234567, 1000);
  // console.log(`Benchmark 5: Found 1 row with id 1234567 1000 times in ${benchmark4} ms`);

  // // Benchmark6: Retrieve all info for all 10M restaurants 
  // // in the DB.
  // let benchmark6 = await findRowsFromRange(0, 10000000);
  // console.log(`Benchmark 6: Found all 10M docs in ${benchmark6} ms`);

  // Benchmark7: Retrieve all info for all restaurants with 
  // ids divisible by 500,000
  let benchmark7 = await findRowsDivisbleBy500k();
  console.log(`Benchmark 7: Found rows with ids divisible by 500k in ${benchmark7} ms`);

  // Benchmark8: Retrieve all info for restaurant with 
  // place_id / place_id 5000001
  let benchmark8 = await findRowForId(5000001);
  console.log(`Benchmark 8: Found row with id 5000001 in ${benchmark8} ms`);

  // Benchmark9: Retrieve the info for the the 6 closest
  // restaurants to the restaurant with id 5000002* key query 
  let benchmark9 = await findNearbyRowsForId(5000002);
  console.log(`Benchmark 9: Found nearby rows for restaurant with id 5000002 in ${benchmark9} ms`);

  // Benchmark10: Retrieve the info for the 6 closest restaurants 
  // to restaurants with the ids 5000025 - 5000050
  let benchmark10 = await findNearbyRowsForIdsInRange(5000025, 5000050);
  console.log(`Benchmark 10: Found nearby rows for restaurants with ids in range 5000025 - 5000050 in ${benchmark10} ms`);
  
  await client.end()
}

connect();