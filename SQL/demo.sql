-- SQL is a Structured English Querying Language (Relational DB)
-- Tables -> rows and columns
-- vertical scaling -> sharding(Horizontal scaling)

-- SQL is a common language

-- My SQL -> RDB simple querying language which is used for smaller apps
-- PostgreSQL -> little bit slower but one of the best db for optimisationms 
    -- and enterprise products OBRDB(Object Based RDB)
-- Oracle -> oracle RDB
-- MS SQL -> microsoft server

-- ACID -> SQL supports ACID properties

-- Why Postgres
-- arrays, user defined are possible in Postgres
-- large data can be handled
-- Object oriented
-- Views and materialised views


-- CREATE TABLE
CREATE TABLE cities(
	name VARCHAR(30),
	country VARCHAR(30),
	population INTEGER,
	area INTEGER
);

-- Select all -> * indicates all columns
SELECT * FROM cities;

-- DATA TYPES
-- https://www.postgresql.org/docs/current/datatype.html

-- task
-- create movies table with cols (title, box_office)
-- Insert minimum 2 movies data


CREATE TABLE phones (
    name VARCHAR(50),
    manufacturer VARCHAR(50),
    price INTEGER,
    units_sold INTEGER
);


INSERT INTO phones(name, manufacturer, price, units_sold)
VALUES
    ('N1100', 'Nokia', 2000, 2356),
    ('Iphone', 'Apple', 75000, 4689),
    ('Galaxy S23', 'Samsung', 60000, 1879),
    ('S23 Ultra', 'Samsung', 120000, 235),
    ('Redmi note 12', 'Xiaomi', 36778, 6756),
    ('Reno 8', 'Oppo', 40500, 398);

SELECT country, population, country FROM cities;


SELECT cities.country FROM cities;
SELECT country FROM cities;

-- SELECT 10 + 5;
-- SELECT 10 - 5;
-- SELECT 10 * 5;
-- SELECT 10 + 5 AS add, 10 / 5 AS sub, 2 ^ 5 AS exponential, 12 % 5 AS remainder;

-- SELECT UPPER(name), name, country FROM cities;
-- SELECT LOWER(name), name, country FROM cities;
-- SELECT UPPER(name) AS upper_name, name, country FROM cities;
-- SELECT LOWER(name) AS lower_name, name, country FROM cities;

-- Address -> Delhi, India -> Shanghai, China
-- || -> join two strings
-- SELECT name, country, (name || ', ' || country) AS Address FROM cities;
-- SELECT name, country, CONCAT(name, ', ', country) AS Address FROM cities;

-- EXPLAIN ANALYZE -> Query Plan

SELECT * FROM cities WHERE area > 3000;
SELECT * FROM cities WHERE area = 3056;

SELECT * FROM cities
WHERE area BETWEEN 3000 AND 4000;

SELECT * FROM cities
WHERE name = 'Delhi' OR name = 'Shanghai';


SELECT * FROM cities
WHERE name IN ('Delhi', 'Shanghai');

SELECT * FROM cities
WHERE name NOT IN ('Delhi', 'Shanghai');

SELECT * FROM cities
WHERE 
	area BETWEEN 2000 AND 3000
	AND name in ('Delhi', 'Shanghai');

SELECT * FROM cities
WHERE 
	area BETWEEN 2000 AND 3000
	OR name in ('Delhi', 'Shanghai');


SELECT name, country, (population / area) AS density 
FROM cities
WHERE (population / area) > 3000;

UPDATE cities
SET population = 50000
WHERE name = 'Delhi';

UPDATE cities
SET population = 60000
WHERE area BETWEEN 2500 AND 3500;

DELETE FROM cities
WHERE name = 'Delhi';

ALTER TABLE cities ADD is_deleted BOOLEAN;
ALTER TABLE cities ADD is_deleted BOOLEAN DEFAULT FALSE;

ALTER TABLE cities DROP COLUMN is_deleted;

-- COUNT -> will not consider the null data
SELECT COUNT(manufacturer) FROM phones;

SELECT MAX(price) FROM phones;
SELECT MIN(price) FROM phones;

SELECT * FROM phones
WHERE price = ( SELECT MAX(price) FROM phones );

SELECT * FROM phones
WHERE price = ( SELECT MIN(price) FROM phones );


SELECT SUM(units_sold) AS total_units FROM phones;
SELECT AVG(units_sold) AS total_units FROM phones;
SELECT AVG(price) AS total_units FROM phones;