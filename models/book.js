'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Book.belongsToMany(models.User,{through:'userBook'})
    }
  }
  Book.init({
    title: DataTypes.TEXT,
    author: DataTypes.TEXT,
    publication: DataTypes.TEXT,
    origin: DataTypes.TEXT,
    pages: DataTypes.INTEGER,
    cost: DataTypes.INTEGER,
    publishedDate:DataTypes.DATE

  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};