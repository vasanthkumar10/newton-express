const express = require("express");

const app = express();

app.use(express.json());

const cars = [
  { id: 1, name: "bmw" },
  { id: 2, name: "audi" },
  { id: 3, name: "mercedez" },
];

app.get("/", (req, res) => {
  console.log("connection received");
  //   Welcome to Vasanth cars
  res.send("Welcome to Vasanth cars");
});

app.get("/cars", (req, res) => {
  console.log("connection received");
  //   send back cars data
  res.send(cars);
});

app.get("/cars/:id", (req, res) => {
  //   console.log("params", req.params);
  //   console.log("query params", req.query);
  //   car with particular id
  const id = req.params.id;

  const car = cars.find((car) => car.id === parseInt(id));
  if (!car) res.status(404).send("Invalid car id....");
  res.send(car);
});

app.post("/cars", (req, res) => {
  const newCar = {
    id: cars.length + 1,
    name: req.body.name,
  };
  cars.push(newCar);
  res.send(newCar);
});

// app.delete('/cars/:id', )

// app.get("/cars/:name/:id", (req, res) => {
//   console.log("params", req.params);
//   res.send(req.params.name);
// });

app.listen(3000, () => console.log("Listening to the port 3000...."));
