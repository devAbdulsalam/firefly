CREATE DATABASE university_store;
\c university_store

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password TEXT NOT NULL,  
  phone VARCHAR(255) NOT NULL,
  role ENUM('STUDENT', 'STAFF', 'ADMIN') NOT NULL,
  registration_number VARCHAR(50),
  staff_id VARCHAR(50)
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE avatar (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  public_id VARCHAR(255) NOT NULL,
  url VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE bus (
    id SERIAL PRIMARY KEY,     
    source VARCHAR(100) NOT NULL DEFAULT 'Chennai',
    destination VARCHAR(100) NOT NULL DEFAULT 'Madurai',
    departure_time TIME NOT NULL DEFAULT '07:00:00',
    arrival_time TIME NOT NULL DEFAULT '07:30:00',
    price DECIMAL(10, 2) NOT NULL DEFAULT 600.00,
    number_of_seats INTEGER NOT NULL DEFAULT 18,
    availableSeats: 0,
);

CREATE TABLE bus_seat (
    id SERIAL PRIMARY KEY,
    bus_id INTEGER REFERENCES bus(id),
    seat_position ENUM('LEFT', 'MIDDLE','RIGHT') NOT NULL ,
    seat_number INTEGER NOT NULL,
    active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

)
CREATE TABLE ticket (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    bus_id INTEGER REFERENCES bus(id),
    seat_number INTEGER NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    booking_date TIMESTAMP NOT NULL,
    status VARCHAR(50) NOT NULL
);


CREATE TABLE report (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    address TEXT NOT NULL,
    description TEXT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'Pending'
    report_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
);


-- ALTER TABLE products ADD COLUMN category_id INTEGER REFERENCES category(id)
-- ALTER TABLE products ADD COLUMN active BOOLEAN  NOT NULL DEFAULT true


-- ALTER TABLE users ADD COLUMN phone VARCHAR(255);
CREATE TABLE category (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE product (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price FLOAT NOT NULL,
  quantity INTEGER NOT NULL,
  active BOOLEAN  NOT NULL DEFAULT true,
  category_id INTEGER REFERENCES category(id),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP  
);
CREATE TABLE product_image (
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES product(id) ON DELETE CASCADE,
  public_id VARCHAR(255) NOT NULL,
  url VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  product_id INTEGER REFERENCES product(id),
  quantity INTEGER NOT NULL,
  total FLOAT NOT NULL,  
  status VARCHAR(255) NOT NULL,
  order_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE inventory (
  product_id INTEGER PRIMARY KEY REFERENCES product(id),
  quantity INTEGER NOT NULL
);
