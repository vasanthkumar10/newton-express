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