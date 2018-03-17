DROP DATABASE marzagat;
CREATE DATABASE marzagat;
\c marzagat;

CREATE TABLE restaurants (
  id INTEGER PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  neighborhood VARCHAR(50) NOT NULL,
  zagat_rating NUMERIC(2,1) NOT NULL,
  description TEXT NOT NULL,
  latitude NUMERIC(7,4) NOT NULL,
  longitude NUMERIC(7,4) NOT NULL,
  address VARCHAR(100) NOT NULL,
  website VARCHAR(50),
  price_level SMALLINT NOT NULL,
  TYPE VARCHAR(25) NOT NULL
);

CREATE TABLE restaurant_photos (
  photo_id INTEGER PRIMARY KEY,
  restaurant_id INTEGER NOT NULL REFERENCES restaurants(id),
  photo_url VARCHAR(100)
);

CREATE TABLE nearby_restaurants (
  restaurant_id INTEGER NOT NULL REFERENCES restaurants(id),
  nearby_id INTEGER NOT NULL REFERENCES restaurants(id),
  nearby_rank SMALLINT NOT NULL,
  PRIMARY KEY (restaurant_id, nearby_rank)
);

CREATE TABLE reviews (
  review_id INTEGER PRIMARY KEY,
  restaurant_id INTEGER NOT NULL REFERENCES restaurants(id),
  review TEXT,
  rating SMALLINT NOT NULL
);