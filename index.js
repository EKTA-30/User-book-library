const express = require('express');
// const sequelize = require('sequelize');
const {bookRoutes,userRoutes} = require('./routes')
const {Book, sequelize,User} = require('./models')
const app = express();

app.use(express.json())
app.use(bookRoutes)
app.use(userRoutes)

async function init(){
    await sequelize.sync({force:true});
}

app.listen(8080,() => {
    init();
    console.log('Server started on port 8080');
})