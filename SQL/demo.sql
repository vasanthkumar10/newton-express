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

-- PRIMART KEY -> Unique key in a table
-- FOREIGN KEY -> creates relation between 2 tables and it points to primary key
-- Primary key is always unique and foreign key is not unique
-- SERIAL -> auto increment number

CREATE TABLE users(
	id SERIAL PRIMARY KEY,
	username VARCHAR(50)
);

CREATE TABLE photos (
 id SERIAL PRIMARY KEY,
 url VARCHAR(200),
 user_id INTEGER REFERENCES users(id)
);

CREATE TABLE photos (
 id SERIAL PRIMARY KEY,
 url VARCHAR(200),
 user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);


CREATE TABLE photos (
 id SERIAL PRIMARY KEY,
 url VARCHAR(200),
 user_id INTEGER REFERENCES users(id) ON DELETE SET NULL
);

-- Types of relations
1. One to One
2. One to Many
3. Many to Many


SELECT username, url FROM users
JOIN photos ON users.id = photos.user_id

SELECT id, username, url
FROM users
JOIN photos ON users.id = photos.user_id -- error


SELECT users.id, username, url, photos.id 
FROM users
JOIN photos ON users.id = photos.user_id

SELECT u.id AS user_id, username, url, p.id AS photo_id
FROM users AS u
JOIN photos AS p ON u.id = p.user_id

-- 1. Find each comment, show the contents of comment and username who wrote that comment
SELECT contents, username
FROM comments
JOIN users ON comments.user_id = users.id;

-- 2. For each comment, list the content of the comment and url of the photo
SELECT contents, url
FROM comments
JOIN photos ON comments.photo_id = photos.id;

-- 3. show each photo url and username of the photo
SELECT url, username FROM photos
JOIN users ON photos.user_id = users.id;


-- INNER JOIN
SELECT url, username, user_id FROM photos
INNER JOIN users ON photos.user_id = users.id;

-- LEFT JOIN
SELECT url, username, user_id, users.id FROM photos
LEFT JOIN users ON photos.user_id = users.id;

-- RIGHT JOIN
SELECT url, username, user_id, users.id FROM photos
RIGHT JOIN users ON photos.user_id = users.id;


-- FULL JOIN
SELECT url, username, user_id, users.id FROM photos
FULL JOIN users ON photos.user_id = users.id;


-- find the comments where users commented on own photos
SELECT contents, comments.user_id FROM comments
JOIN photos ON comments.user_id = photos.user_id;

SELECT DISTINCT(contents), comments.user_id FROM comments
JOIN photos ON comments.user_id = photos.user_id;

SELECT DISTINCT(user_id) FROM comments; -- unique data

-- find the comments, username where users commented on own photos
https://docs.google.com/document/d/18COWqkmi9zWqdU4QsWWYKM5UNzN8WymzZhU2pYnYIAk/edit?usp=sharing

-- GROUPING AGGREGATION
SELECT user_id, count(contents) FROM comments
GROUP BY user_id;

-- only user_id 1
SELECT user_id, count(contents) FROM comments
WHERE user_id = 1
GROUP BY user_id;

SELECT user_id, photo_id, count(contents) FROM comments
-- WHERE user_id = 1
GROUP BY user_id, photo_id
-- HAVING photo_id = 5;


-- SORTING AND LIMITING
SELECT * FROM comments
ORDER BY user_id

SELECT * FROM comments
ORDER BY user_id DESC

SELECT * FROM comments
ORDER BY user_id, photo_id

SELECT * FROM comments
ORDER BY user_id DESC, photo_id ASC


SELECT * FROM comments
WHERE user_id > 3
ORDER BY user_id DESC, photo_id ASC
LIMIT 10

SELECT * FROM comments
LIMIT 5 OFFSET 10

-- PAGINATION
SELECT * FROM comments
LIMIT 15 OFFSET 15
-- LIMIT 15(limit) OFFSET 15 ((page - 1) * (limit))


-- WILD CARD CHARS -> %, _
-- % -> 0 or more than 1 chars
-- _ -> exactly match the count of _

SELECT * FROM comments
WHERE contents LIKE '%olu%';

SELECT * FROM comments
WHERE contents LIKE 'Est%';

SELECT * FROM comments
WHERE contents LIKE '%facilis.';

SELECT * FROM comments
WHERE contents LIKE '%facili__';


-- CTE -> COMMON TABLE EXPRESSION

WITH
CTE_USERS AS (
	SELECT * FROM users
	WHERE id < 3
)

SELECT * FROM CTE_USERS;

-- CTE -> COMMON TABLE EXPRESSION

WITH 
cte_comments AS (
	SELECT * FROM comments
	WHERE user_id < 3
),

cte_users AS (
	SELECT * FROM users
	WHERE id < 3
)

SELECT user_id, username, contents FROM cte_comments AS cc
JOIN cte_users AS cu ON cu.id = cc.user_id
ORDER BY user_id;