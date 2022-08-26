const { Book, Sequelize } = require("../models");
const { Op } = require("@sequelize/core");

async function createBook(req, res) {
  try {
    const data = req.body;
    if (!(data.title || data.author)) {
      res.send({ msg: "Unable to create book without required information" });
    }

    const title = data.title;
    const author = data.author;
    const publication = data.publication;
    const origin = data.origin;
    const pages = data.pages;
    const cost = data.cost;
    const publishedDate = data.publishedDate;

    const book = await Book.create({
      title,
      author,
      publication,
      origin,
      pages,
      cost,
      publishedDate,
    });
    res.send(book);
  } catch (err) {
    res.status(400).send({ msg: "Unable to create book" });
  }
}

async function getAllBooks(req, res) {
  try {
    const books = await Book.findAll();
    res.send(books);
  } catch (err) {
    res.status(400).send({ msg: "Unable to fetch data" });
  }
}

async function findByDate(req, res) {
  try {
    const fromDate = req.params.publishedDate;
    const books = Book.findAll({
      where: {
        title: {
          [Op.gt]: fromDate,
        },
      },
    });

    res.send(books);
  } catch (err) {
    console.log(err);
    res.status(400).send({ msg: "Unable to detch data" });
  }
}
async function findBookByTitle(req, res) {
  const bookTitle = req.query.title;
  console.log(bookTitle);
  try {
    const book = Book.findOne({
      where: {
        title: bookTitle
      },
    });

    res.send(book);
  } catch (err) {
    res.status(500).send({ msg: "Internal server error" });
  }
}

async function deleteBook(req, res) {
  try {
    const id = req.params.id;
    const deletedBook = await Book.destroy({
      where: {
        id: id,
      },
    });
    res.send({ msg: "Book deleted successfully ", deletedBook });
  } catch (err) {
    res.status(500).send({ msg: "Internal server error" });
  }
}

module.exports = {
  createBook,
  getAllBooks,
  findByDate,
  findBookByTitle,
  deleteBook,
};

// title: DataTypes.TEXT,
// author: DataTypes.TEXT,
// publication: DataTypes.TEXT,
// origin: DataTypes.TEXT,
// pages: DataTypes.INTEGER,
// cost: DataTypes.INTEGER
