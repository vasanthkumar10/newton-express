const express = require("express");
const Joi = require("joi");
const morgan = require("morgan");
const logger = require("./logger");

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(morgan("combined"));

// app.use(logger);

// app.use(function (req, res, next) {
//   console.log("logging middleware.....");
//   next();
// });

// app.use(function (req, res, next) {
//   console.log("authorisation middleware.....");
//   next();
// });

let cars = [
  { id: 1, name: "bmw" },
  { id: 2, name: "audi" },
  { id: 3, name: "mercedez" },
];

app.get("/", (req, res) => {
  console.log("connection received");
  //   Welcome to Vasanth cars
  return res.send("Welcome to Vasanth cars");
});

app.get("/cars", (req, res) => {
  console.log("connection received");
  //   send back cars data
  return res.status(200).send(cars);
});

app.get("/cars/:id", (req, res) => {
  //   console.log("params", req.params);
  //   console.log("query params", req.query);
  //   car with particular id
  const id = req.params.id;

  const car = cars.find((car) => car.id === parseInt(id));
  if (!car) return res.status(404).send("Invalid car id....");
  return res.status(200).send(car);
});

app.post("/cars", (req, res) => {
  // if (!req.body.name) return res.status(404).send("Invalid request...");
  // if (req.body.name.length < 3)
  //   return res.status(404).send("Name should have minimum 3 chars...");

  const { error } = validate(req.body);
  // console.log("error", error);
  if (error) return res.status(404).send(error.details[0].message);

  const newCar = {
    id: cars.length + 1,
    name: req.body.name,
  };
  cars.push(newCar);

  return res.status(200).send(newCar);
});

app.put("/cars/:id", (req, res) => {
  const car = cars.find((car) => car.id === parseInt(req.params.id));
  if (!car)
    return res.status(404).send("Invalid request.... car id is not available");
  const { error } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  car.name = req.body.name;
  return res.status(200).send(car);
});

app.delete("/cars/:id", (req, res) => {
  const carToBeDeleted = cars.find((car) => car.id === parseInt(req.params.id));
  if (!carToBeDeleted)
    return res.status(404).send("Invalid request.... car id is not available");

  // cars = cars.filter((car) => car.id !== carToBeDeleted.id);
  let index = cars.indexOf(carToBeDeleted);
  cars.splice(index, 1);
  return res.status(200).send(carToBeDeleted);
});

function validate(car) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(10).required(),
  });
  return schema.validate(car);
}

// app.get("/cars/:name/:id", (req, res) => {
//   console.log("params", req.params);
//   res.send(req.params.name);
// });

app.listen(3000, () => console.log("Listening to the port 3000...."));
