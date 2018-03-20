DROP DATABASE marzagat;
CREATE DATABASE marzagat;
\c marzagat;

CREATE TABLE restaurants (
  restaurant_id INTEGER,
  name VARCHAR(50) NOT NULL,
  neighborhood VARCHAR(50) NOT NULL,
  google_rating NUMERIC(2,1) NOT NULL,
  zagat_rating NUMERIC(2,1) NOT NULL,
  review_count SMALLINT NOT NULL,
  description TEXT NOT NULL,
  latitude NUMERIC(7,4) NOT NULL,
  longitude NUMERIC(7,4) NOT NULL,
  address VARCHAR(100) NOT NULL,
  website VARCHAR(50),
  price_level SMALLINT NOT NULL,
  type VARCHAR(25) NOT NULL
);

CREATE TABLE restaurant_photos (
  photo_id INTEGER,
  restaurant_id INTEGER NOT NULL,
  photo_url VARCHAR(100)
);

CREATE TABLE nearby_restaurants (
  restaurant_id INTEGER NOT NULL,
  nearby_id INTEGER NOT NULL,
  nearby_rank SMALLINT NOT NULL
);