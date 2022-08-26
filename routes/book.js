const {createBook, getAllBooks,findByDate,findBookByTitle,deleteBook} = require('../controller/book');
const {checkBookTitle,verifyTokens} = require('../middleware')
const express = require('express');

const route = express.Router();

route.post('/books/api/v1/book',[verifyTokens,checkBookTitle],createBook);

route.get('/books/api/v1/books',[verifyTokens],getAllBooks);

route.get('/books/api/v1/books/:publishedDate',findByDate) //not working

route.get('/books/api/v1/book',findBookByTitle) // not working 

route.delete('/books/api/v1/books/:id',[verifyTokens],deleteBook)

module.exports = {bookRoutes : route}