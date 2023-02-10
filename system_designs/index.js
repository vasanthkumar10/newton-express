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

//
