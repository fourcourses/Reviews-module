const Sequelize = require('sequelize');
const sequelize = require('./connection.js');

const {
  Model
} = Sequelize;

class Reviews extends Model {}
Reviews.init({
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  restaurantid:{
    type: Sequelize.INTEGER,
    //primaryKey:true
  },
  review: {
    type: Sequelize.TEXT,
  },
  noise:{
    type: Sequelize.TEXT
  },
  createdat:{
    type:Sequelize.TEXT
  },
  recommended:{
    type:Sequelize.TEXT
  },
  foodRating:{
    type:Sequelize.TEXT
  },
  ambianceRating:{
    type:Sequelize.TEXT
  },
  serviceRating:{
    type:Sequelize.TEXT
  },
  valueRating:{
    type:Sequelize.TEXT
  },
  overallRating:{
    type:Sequelize.TEXT
  },
  reviewCount:{
    type:Sequelize.TEXT
  },
}, {
  sequelize,
  modelName: 'Reviews',
  underscored: true,
  timestamps: false
});
class User extends Model {}
User.init({
  id:{
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  username: {
    type:Sequelize.TEXT,
  },
  initials:{
    type:Sequelize.TEXT
  },
  city:{
    type:Sequelize.TEXT
  }
}, {
  sequelize,
  modelName: 'User',
  underscored: true,
  timestamps: false
})
User.hasMany(Reviews);
Reviews.belongsTo(User)
sequelize.sync();
//module.exports = Reviews;