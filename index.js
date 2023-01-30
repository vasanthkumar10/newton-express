// const express = require("express");
// // const Joi = require("joi");
// // const morgan = require("morgan");
// // const logger = require("./logger");
// // const vasanth = require("vasanth-ops");
// // const config = require("config");
// // const log = require("debug")("app:startup");
// // const dbLog = require("debug")("app:db");
// // const cookieParser = require("cookie-parser");
// const cars = require("./router/cars");

// const app = express();

// app.set("view engine", "pug");
// app.set("views", "./views");

// // middlewares
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static("public"));
// app.use(cookieParser());

// if (process.env.NODE_ENV === "development") {
//   app.use(morgan("combined"));
// }

// // console.log("config -----", config.get("name"));
// // console.log("config -----", config.get("data.value"));

// // console.log("node js env", process.env.NODE_ENV);
// // console.log("adding....", vasanth.add(5, 10));
// // console.log("multiplying....", vasanth.mul(5, 10));

// // app.use(logger);

// // app.use(function (req, res, next) {
// //   console.log("logging middleware.....");
// //   next();
// // });

// // app.use(function (req, res, next) {
// //   console.log("authorisation middleware.....");
// //   next();
// // });

// app.use("/cars", cars);
// app.use("/method", cars);

// app.get("/", (req, res) => {
//   log("connection received");
//   //   Welcome to Vasanth cars
//   // return res.send("Welcome to Vasanth cars");
//   return res.render("index");
// });

// app.get("/newtonschool/:name", (req, res) => {
//   return res.render("welcome", {
//     title: "Newton school",
//     message: `Welcome to Newton school ${req.params.name}`,
//   });
// });

// app.get("/signin", (req, res) => {
//   res.cookie("session_id", "123456");
//   return res.status(200).json({
//     msg: "signed in",
//   });
// });

// function validateCookie(req, res, next) {
//   const { cookies } = req;
//   if ("session_id" in cookies && cookies.session_id === "123456") {
//     next();
//   } else {
//     return res.status(401).json({
//       msg: "Unauthorised",
//     });
//   }
// }

// app.get("/emails", validateCookie, (req, res) => {
//   return res.status(200).json({
//     msg: "This is my email",
//   });
// });

// // app.get("/cars/:name/:id", (req, res) => {
// //   console.log("params", req.params);
// //   res.send(req.params.name);
// // });

// app.listen(3000, () => console.log("Listening to the port 3000...."));

// const express = require("express");
// const app = express();

// app.get("/", (req, res) => {
//   return res.status(200).send("Doing load test to analyse performance....");
// });

// module.exports.start = function () {
//   app.listen(3000, () => console.log("listening to port 3000...."));
// };

// load test
// apache benchmark (ab)
// k - keep it alive
// c - concurrent
// n - no of request

// app.use("/cars", cars);
// app.use("/carsdata", cars);

// app.listen(3000, () => console.log("listening to port 3000"));

// CPU intensive process
// const express = require("express");
// const app = express();
// const { Worker } = require("worker_threads");

// let counter = 0;

// app.get("/", (req, res) => {
//   counter++;
//   return res.status(200).json({ counter });
// });

// // app.get("/intensive", (req, res) => {
// //   for (let i = 0; i < 10000000000; i++) {
// //     counter++;
// //   }
// //   return res.status(200).json({ counter });
// // });

// app.get("/intensive", (req, res) => {
//   const worker = new Worker("./workers.js", {
//     workerData: {
//       counter,
//       total: 5000000,
//     },
//   });

//   worker.on("message", (data) => {
//     return res.status(200).json({
//       counter: data,
//     });
//   });
// });

// app.listen(3000, () => console.log("listening to port 3000...."));

//
// let arr = [1, 2, [3, 4]];
// console.log([...arr]);

// jwt

// const express = require("express");
// const jwt = require("jsonwebtoken");

// const app = express();
// app.use(express.json());

// app.get("/home", (req, res) => {
//   return res.status(200).json({
//     msg: "Welcome to Newton School!!!",
//   });
// });

// app.post("/post", verifyToken, (req, res) => {
//   jwt.verify(req.token, "secretkey", (err, auth) => {
//     if (err) return res.sendStatus(403);
//     return res.status(200).json({
//       auth,
//       msg: "Creating a post in insta",
//     });
//   });
// });

// // reimbursement

// app.post("/login", (req, res) => {
//   const { username, password } = req.body;
//   jwt.sign(
//     { username, password },
//     "secretkey",
//     { expiresIn: "30s" },
//     (err, token) => {
//       return res.status(200).json({
//         token,
//       });
//     }
//   );
// });

// function verifyToken(req, res, next) {
//   const bearerHeader = req.headers["authorization"];
//   if (bearerHeader === undefined)
//     return res.status(403).json({
//       msg: "Access denied",
//     });

//   const bearer = bearerHeader.split(" ");
//   console.log(bearer);
//   // console.log(bearerHeader);
//   req.token = bearer[1];
//   next();
// }

// app.listen(3000, () => console.log("Listening to server 3000...."));

// pin number, password

// username - vasanth
// password - admin123 -> dghasjidgahd6783e46bjdsadhjasbjdaslkd

// bcrypt

// const express = require("express");
// const bcrypt = require("bcrypt");
// const app = express();
// const saltRounds = 10;

// let hashedPassword = "";

// // middleware
// app.use(express.json());

// app.post("/signup", async (req, res) => {
//   const { username, password } = req.body;
//   const salt = await bcrypt.genSalt(saltRounds); // it will take time to generate the salt
//   // console.log("salt generated --", salt);
//   hashedPassword = await bcrypt.hash(password, salt);
//   // console.log("hashed password - ", hashedPassword);
//   return res.status(200).json({
//     username,
//     msg: "Successfully signed up",
//   });
// });

// app.post("/signin", async (req, res) => {
//   const { username, password } = req.body;
//   // hashed password will come from db
//   const isValid = await bcrypt.compare(password, hashedPassword);
//   // console.log("result-", isValid);
//   if (isValid) return res.status(200).json({ msg: "successfully signed in" });
//   return res.status(403).json({ msg: "Invalid username or password" });
// });

// app.listen(3000, () => console.log("listening to port 3000...."));

/**
 * -----------------------
 * PAGINATION
 * -----------------------
 */

// id -> 1 to 200
// users = 200;
// limit = 10;

// totalpage = users/limit => 200/10 = 20 pages
// current page = 1 -> data: 1 to 10
// start -> 1 => (page - 1) * limit => (1 - 1) * 10 = 0
// end -> 10 => (page) * limit => (1) * 10 = 10
// condition => id > start && id <= end
// id > 0 and id <= 10 -> 1 - 10

// id -> 1 to 200
// users = 200;
// limit = 10;

// totalpage = users/limit => 200/10 = 20 pages
// current page = 2 -> data: 11 to 20
// start -> 11 => (page - 1) * limit => (2 - 1) * 10 = 1 * 10 = 10
// end -> 20 => (page) * limit => (2) * 10 = 20
// condition => id > start && id <= end
// id > 10 and id <= 20 => 11 - 20

// id -> 1 to 200
// users = 200;
// limit = 15;

// totalpage = users/limit => 200/15 = 14 pages
// current page = 7 -> data: 91 to 105
// start -> 91 => (page - 1) * limit => (7 - 1) * 15 = 6 * 15 = 90
// end -> 105 => (page) * limit => (7) * 15 = 105
// condition => id > start && id <= end
// id > 90 and id <= 105 => 91 - 105

const express = require("express");
const app = express();

app.use(express.json());

const users = [];

for (let i = 1; i <= 200; i++) {
  if (i % 3 === 0) continue;
  users.push({
    id: i,
    name: `user - ${i}`,
  });
}

app.post("/users", (req, res) => {
  const { page, limit } = req.body;
  const start = (page - 1) * limit;
  const end = page * limit;
  // const data = users.filter((user) => user.id > start && user.id <= end);
  let data = [];
  users.forEach((user, index) => {
    if (index >= start && index < end) data.push(user);
  });

  const pagination = {
    totalPages: Math.ceil(users.length / limit),
    currentPage: page,
    totalUsers: users.length,
  };
  return res.status(200).json({ data, pagination });
});

app.listen(3000, () => console.log("listening to port 3000...."));
