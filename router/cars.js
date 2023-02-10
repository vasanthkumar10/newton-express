const Joi = require("joi");
const express = require("express");
const log = require("debug")("app:startup");
const dbLog = require("debug")("app:db");
const router = express.Router();

let cars = [
  { id: 1, name: "bmw" },
  { id: 2, name: "audi" },
  { id: 3, name: "mercedez" },
];

function validate(car) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(10).required(),
  });
  return schema.validate(car);
}

router.get("/", (req, res) => {
  log("connection received");
  dbLog("db connection successful");
  //   send back cars data
  return res.status(200).json({
    cars,
    metaData: {
      pagination: {
        pageNo: 1,
        total: 100,
      },
    },
  });
});

router.get("/:id", (req, res) => {
  //   console.log("params", req.params);
  //   console.log("query params", req.query);
  //   car with particular id
  const id = req.params.id;

  const car = cars.find((car) => car.id === parseInt(id));
  if (!car) return res.status(404).send("Invalid car id....");
  // return res.status(200).send(car);
});

router.post("/", (req, res) => {
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

router.put("/:id", (req, res) => {
  const car = cars.find((car) => car.id === parseInt(req.params.id));
  if (!car)
    return res.status(404).send("Invalid request.... car id is not available");
  const { error } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  car.name = req.body.name;
  return res.status(200).send(car);
});

router.delete("/:id", (req, res) => {
  const carToBeDeleted = cars.find((car) => car.id === parseInt(req.params.id));
  if (!carToBeDeleted)
    return res.status(404).send("Invalid request.... car id is not available");

  // cars = cars.filter((car) => car.id !== carToBeDeleted.id);
  let index = cars.indexOf(carToBeDeleted);
  cars.splice(index, 1);
  return res.status(200).send(carToBeDeleted);
});

module.exports = router;
