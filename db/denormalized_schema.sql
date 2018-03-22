DROP DATABASE marzagat-denormalized;
CREATE DATABASE marzagat-denormalized;
\c marzagat-denormalized;

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
  type VARCHAR(25) NOT NULL,
  photo_url_1 VARCHAR(100) DEFAULT NULL,
  photo_url_2 VARCHAR(100) DEFAULT NULL,
  photo_url_3 VARCHAR(100) DEFAULT NULL,
  photo_url_4 VARCHAR(100) DEFAULT NULL,
  photo_url_5 VARCHAR(100) DEFAULT NULL,
  photo_url_6 VARCHAR(100) DEFAULT NULL,
  photo_url_7 VARCHAR(100) DEFAULT NULL,
  photo_url_8 VARCHAR(100) DEFAULT NULL,
  photo_url_9 VARCHAR(100) DEFAULT NULL,
  photo_url_10 VARCHAR(100) DEFAULT NULL
);

CREATE TABLE nearby_restaurants (
  restaurant_id INTEGER NOT NULL,
  nearby_id INTEGER NOT NULL,
  nearby_rank SMALLINT NOT NULL
);