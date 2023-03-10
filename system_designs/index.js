// Functional requirements
// Non functional requirements
// HLD -> High Level Design
// LLD -> Low Level Design

// 1. Client Server Architecture
// 2. IP packets, TCP, HTTP, HTTPS

// dig redis.io

// Every device will have appx 16000 ports
// http -> port 80
// https -> port 443
// secure shell -> port 22
// dns -> port 53

// net cap
// nc -l 8081              nc 127.0.0.1 8081

// Client server architecture

// Network Protocols
// IP -> Internet Protocol -> IP packets -> (2^16 bytes) of data + headers
// TCP -> Transmission control Protocol -> Solves missing data of IP, provides handshake, more secure
// HTTP -> Hypertext Transfer Protocol -> Req Res paradigm
// HTTPS -> HTTP + Secured(S)

// Storage
// Database (db) -> server -> write data -> consistent storage -> Persist the data -> read the data
// writing -> memory + disk
// Consistency -> provides the stable data and upto date(SQL) -> Vertical scaling
// eg: MySQL, PostgreSQL, Oracle,...
// No SQL -> Horizontally -> schemaless architecture
// eg: Mongodb, cassandra, couchdb
// Failure -> copy of data(backup), distributed systems

// Latency and throughput
// Latency -> time taken to complete the operation in a system
// Throughput -> No of operations a system can do in per unit of time(RPS or QPS) (Request/Queries handled per second)

// cloud applications
// Inhouse server -> Server in my company itself + very risky
// Cloud servers -> Servers present in multiple regions and I can rent the server wherever I want

// Availability -> The availability of server to the client -> measured in %
// HA -> High availability
// Nines
// 99% (two nines) -> 87.8 hrs of down time
// 99.9% (three nines) -> 8.8 hrs of down time
// 99.99% (four nines) -> 52.6 mins of down time
// 99.999% (five nines) -> 5.3 mins of down time

// SLA -> Service Level Agreement -> guarentee document which is provided by service provider to the client.
// SLO -> Service Level Objective document -> Regional or service wise

// redundancy -> The process of replicating parts of system to make it more reliable
// Passive redundancy -> If one server dies,  it will be replaced by backup data
// Active redundancy -> If one server dies, second server is gonna take up the process(Leader election method)

// Caching
// cache -> is a piece of software or hardware used to retrive the data faster(to reduce latency)
// Mostly responses are stored in cache
// Write through cache -> redundant work -> slow but secure process
// Write back cache -> server only updates the cache and cache asynchronously updates the db using CRON
// cons -> If cache data is deleted we'll lose the original data, multiple updates are happening in the
// specified time, we can't track the logs (logger system in load balancer)

// client level caching
// server level caching
// database level caching

// CDN (Content Delivery Network) -> A 3rd party service acts like a cache to provide better service(reduce latency)
// cloudfare, google cloud CDN. ususally CDNs are referred in PoPs(Point of Presence)

// cons: stale data if main data is updated but cache is not updated(we'll proivde false info)

// Cache hit -> When a requested data is present in the cache
// cache miss -> When a req data is not present in the cache(got to server and compute)
// eg: if the server fails, the loadbalancer is gonna redirect the request where cache is not present

// Cache Eviction Policy -> removes data from the cache
// LRU -> Least Recently Used
// FIFO -> First In First Out
// LFU -> Least Frequently Used

const express = require("express");
const app = express();

app.use(express.json());

app.get("/withoutcache", (req, res) => {
  const number = req.query.number;
  let i = 0;
  let sum = 0;
  while (i <= number) {
    sum += i;
    i++;
  }

  return res.status(200).json({ data: sum });
});

const cache = {};
app.get("/withcache", (req, res) => {
  const number = req.query.number;
  if (number in cache) {
    console.log("from cache");
    return res.status(200).json({ data: cache[number] });
  }

  let i = 0;
  let sum = 0;
  console.log("from process");
  while (i <= number) {
    sum += i;
    i++;
  }

  //  storing in cache
  cache[number] = sum;
  return res.status(200).json({ data: sum });
});

app.get("/proxy", (req, res) => {
  console.log(req.headers);
  return res.send("from proxy");
});

app.listen(3000, () => console.log("server running on port 3000....."));

// PROXY
// Proxy -> Forward proxy -> A server sits inbetween client and server. It hides(masks) the client identity
// eg: VPN
// Reverse Proxy -> A server sits inbetween client and server. It hides(masks) the server identity typically used
// for load balancing, caching or logging the data
// Nginx -> load balancer, caching and it acts as a reverse proxy as well

// Hashing -> A function which takes a data and converts into unreadable format
// SHA -> Secure Hashing Algorithms are used in hashing
// Hot spot ->  If data is splitted, most of the traffic will come to the single server(hot spot)

// consistent hashing -> It is a type of hashing mechanishm to reduce the client server mapping.
// loadbalancer -> who is going to forward the request
// Rendezvous hashing

// Key - value pairs for the caching purpose
// redis -> inmemory key value store
// replacments -> memcache, zookeeper

// Storage types
// BLOB -> Binary Large OBject -> unstructured binary data
// GCS, S3 are some of the services where we can store images or videos

// Graph db -> Neo4j
// GraphQL + Prisma
// Timeseries -> prometheous (monitor load, cpu, servers)

// Replication of db -> Write db -> pipelines -> read db
// Copying is of 2 ways -> synchronous and asynchronous

// Splitting the db -> Sharding
// small chunks of db is called shards
// DB can be splitted based on region, time zones, roles, hashing

// Peer to peer network -> A collection of machines is used to perform the action
// Gossips protocol -> will be used to keep track of order

// Leader election -> In a cluster of servers(master slave architecture), if the master dies,
// the next leader is selected based on parameters like region, type of transactions and payment methods etc

// Consensus algorithms -> Paxos and raft algorithm
// load balancer as a reverse proxy to mask the servers ip.
// In order to track the leader we are going to use redis or zookeeper (in memory db)

// HTTP polling -> The process of fetching the resource regularly at an constant interval of time
// Sockets -> Creates a pipeline connection between client and the server.
// Client is always listening to the server and whenever server gets an update, it'll be sent to the client

// DOS -> Denial of service
// DDOS -> Distributed Denial of Service

// Rate limiting -> The process of limiting the no of requests received from the
// common client per interval of time
// redis: ip -> no of time user made the request (expire time of 10sec(eg))

// TLS -> Transport Layer Security is used to create the handshake where the public/private key transfer
// will happen via SSL (Secure Socket Layer) certificate
// SSL certificate is provided by domain service provider(go-daddy, wix, google)
// Certificate Authority is giving the SSL certificates to the domains

// MITM attacks -> Man in the middle attack is where the hacker gets the data in the req res cycle
