// Database -> It is place where we store the data and retrive the data
// SQL -> Structured Query Language -> Tables -> rows and columns
// Pros -> fast, consistent, stable, optimisation
// Cons -> memory wastage, when the data size grows I have to improve the hardware -> Vertical scaling

// NO SQL -> Schemas(table) and documents(row) and columns(JSON keys)
// pros ->  less memory wastage, when the data size grows can split the db -> Horizontal scaling
// cons -> slow, not consistent, not stable, optimisation chances are very less

// mongoose -> ORM -> Object Relational Mapper

const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/playground")
  .then(() => console.log("connected to my mongodb..."))
  .catch((err) =>
    console.log(`Error occured while connecting mongodb - ${err}`)
  );

const bookSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 30 },
  author: String,
  genre: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

// Schema types -> Number, String, Date, Boolean, Array, ObjectId, Buffer

const Book = mongoose.model("Book", bookSchema);

async function createBook() {
  console.log("creating a new book....");
  const book = new Book({
    name: "Vasanth in Goa",
    author: "Vasanth",
    genre: ["Finance", "Personal development"],
    isPublished: true,
  });

  try {
    const result = await book.save();
    console.log(`Created a book with data - ${result}`);
  } catch (err) {
    console.log(`Error occured while creating a book ${err}`);
  }
}

createBook();
