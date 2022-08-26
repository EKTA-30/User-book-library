const {signUp,signIn} = require('../controller/user')
const {checkDuplicateUserNameAndEmail} = require('../middleware')
const express = require('express')
const route = express.Router();

route.post('/books/api/v1/user',[checkDuplicateUserNameAndEmail],signUp)

route.post('/books/api/v1/userSignIn',signIn)

module.exports = {userRoutes : route}