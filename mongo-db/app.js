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
  name: { type: String, required: true, minlength: 3, maxlength: 50 },
  author: String,
  genre: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

// Schema types -> Number, String, Date, Boolean, Array, ObjectId, Buffer

const Book = mongoose.model("Book", bookSchema);

async function createBook() {
  const book = new Book({
    name: "Rich dad Poor dad tamil version",
    author: "vishwa",
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

// createBook();

async function getAllBooks() {
  const books = await Book.find(); // will return all data
  console.log(books);
}

// getAllBooks();

// async function getBooks() {
//   const books = await Book
//     // .find({ author: "Vasanth", isPublished: true })
//     // .find({ author: "Vasanth" });
//     .find()
//     .sort({ name: -1 }) // 1 sorts ascending , -1 sorts descending
//     // .select({ name: 1, author: 1 })
//     .count();
//   // .limit(2);
//   console.log(books);
// }

async function getBooks() {
  // logical operators -> or, and
  // AND
  // const books = await Book.find({ isPublished: true, author: "Vasanth" });

  // or
  // const books = await Book.find().or([
  //   { author: "Vasanth" },
  //   { isPublished: true },
  // ]);

  // regular expression -> /pattern/

  // starts -> /^pattern/
  // const books = await Book.find({ author: /^v/i });

  // end -> /pattern$/
  // const books = await Book.find({ name: /dad$/i });

  // contains -> /.*pattern.*/
  const books = await Book.find({ name: /.*poor.*/i });
  console.log(books);
}

// getBooks();

// Update books
async function updateBooks(id) {
  const book = await Book.findById(id);
  // console.log(book);
  if (!book) return;
  // book.isPublished = false;
  // book.author = "gautam singh";

  // book.set({
  //   author: "Anand",
  //   isPublished: true,
  // });

  const updatedBook = await book.save();
  console.log("Updated book is ", updatedBook);
}

// updateBooks("63de1a01ebb1fc23c9b5c6be");

// delete the book
async function deleteBook(id) {
  // const deletedBook = await Book.findByIdAndDelete(id); // recommended way
  // const deletedBook = await Book.deleteOne({ author: "Vasanth" });
  // const deletedBook = await Book.deleteMany({ author: "Vasanth" });
  // console.log(deletedBook);
}

deleteBook("63dd427e7676448fd5284176");
