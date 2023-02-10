const mongoose = require("mongoose");
const express = require("express");
const app = express();

mongoose
  .connect("mongodb://localhost:27017/playground")
  .then(() => console.log("connected to my mongodb..."))
  .catch((err) =>
    console.log(`Error occured while connecting mongodb - ${err}`)
  );

app.use(express.json());

const orderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  product: String,
  price: Number,
  quantity: Number,
  date: { type: Date, default: Date.now },
  totalPrice: Number,
});
const Order = mongoose.model("Order", orderSchema);

app.post("/createOrder", async (req, res) => {
  const { customerName, product, price, quantity } = req.body;
  try {
    console.log("Creating new order");
    const order = new Order({
      customerName,
      product,
      price,
      quantity,
      totalPrice: quantity * price,
    });
    //   console.log(order);

    const newOrder = await order.save();
    //   console.log("new order ", newOrder);
    return res.status(200).json({
      msg: "Successfully created the order",
      data: newOrder,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
      msg: "Internal Server Error",
    });
  }
});

app.get("/getOrder", async (req, res) => {
  //   const { id } = req.query;
  //   console.log(id);
  //   const order = await Order.findById(id);

  // comparison operators -> eq, ne, gt, gte, lt, lte, in, nin
  try {
    const { price } = req.query;

    const orders = await Order.find({
      price: { $lte: price },
    });
    return res.status(200).json({
      data: orders,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
      msg: "Internal Server Error",
    });
  }
});

app.post("/updateOrder", async (req, res) => {
  try {
    const { id, price } = req.body;
    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ msg: "Invalid order Id" });
    order.price = price;
    order.totalPrice = price * order.quantity;
    const updatedOrder = await order.save();
    return res.status(200).json({
      msg: "Order updated successfully",
      data: updatedOrder,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
      msg: "Internal Server Error",
    });
  }
});

app.delete("/deleteOrder", async (req, res) => {
  try {
    const { id } = req.body;
    const deletedOrder = await Order.findByIdAndDelete(id);
    return res.status(200).json({
      msg: "Order deleted successfully",
      data: deletedOrder,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
      msg: "Internal Server Error",
    });
  }
});

app.listen(3000, () => console.log("listening to port 3000..."));
