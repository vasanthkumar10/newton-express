/**
 * HTTP -> header, type, cookies, session,
 * HTTPS -> Secured -> Encrypted
 *
 * Status codes has to be followed
 */

// STATUS codes

/**
 * (100 - 199) - Informational data
 * (200 - 299) - Successful information
 * (300 - 399) - Redirect my webpage
 * (400 - 499) - Client error response
 * (500 - 599) - Server side error response
 */

// 100 - continue -> client should continue to request
// http polling -> retry n number of times till you get the data
// 101 - changing the protocol

// 200 - OK(success)
// 201 - created -> new data is getting created in server
// 202 - acceptable
// 204 - No content

// 300 -> not to use in industry
// 301 -> moved permanently
// 302 -> found
// 307 -> temporary redirect
// 308 -> permanent redirect

// 400 - Bad request
// 401 - unauthorised
// 403 - forbidden
// 404 - not found
// 408 - server timeout
// 413 - payload is very heavy
// 429 - too many request

// 500 - Internal server error
// 501 - Not implemented
// 502 - Bad gateway
// 503 - Server unavailable
// 504 - Gateway is timeout
// 507 - Insufficent storage
