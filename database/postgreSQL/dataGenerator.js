/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
const csvWriter = require('csv-write-stream');
const fs = require('fs');
const faker = require('faker');
const EventEmitter = require('events')
class Review {
  constructor() {
    this.review = faker.random.words(),
      this.noise = Math.floor(Math.random() * 3 + 1),
      this.createdAt = faker.date.past(),
      this.recommended = Math.floor(Math.random() * 60 + 40),
      this.foodRating = Math.ceil(Math.random() * 4 + 1),
      this.ambianceRating = Math.ceil(Math.random() * 4 + 1),
      this.serviceRating = Math.ceil(Math.random() * 4 + 1),
      this.valueRating = Math.ceil(Math.random() * 4 + 1),
      this.overallRating = (this.foodRating + this.ambianceRating + this.serviceRating + this.valueRating) / 4,
      this.reviewCount = Math.ceil(Math.random() * 50)
  }
}
class User {
  constructor() {
    this.username = faker.internet.userName(),
      this.initials = faker.name.firstName().slice(0, 1) + faker.name.lastName().slice(0, 1),
      this.profilePic = faker.internet.avatar(),
      this.city = faker.address.city()
  }
}

const makeReview = async () => {
  const write_stream = fs.createWriteStream('reviews.csv')
  write_stream.write(`id|restaurantid|review|noise|createdat|recommended|foodrating|ambiancerating|servicerating|valuerating|overallrating|reviewcount|user_id\n`)
  var ticker = 0
  var userTicker = 0
  var restaurantId = 1
  for (let i = 0; i < 10000000; i++) {
    if (ticker >= 10) {
      restaurantId++
      ticker = 0
    }
    if(userTicker > 10000){
      userTicker = 0
    }
    const review = new Review();
    review.restaurantId = restaurantId
    review.userId = userTicker
    if (!write_stream.write(`${i}|${review.restaurantId}|${review.review}|${review.noise}|${review.createdAt}|${review.recommended}|${review.foodRating}|${review.ambianceRating}|${review.serviceRating}|${review.valueRating}|${review.overallRating}|${review.reviewCount}|${review.userId}\n`)) {
      await new Promise((resolve) => {
        write_stream.once('drain', resolve)
      })
    }
    userTicker++
    ticker++
  }
};
makeReview()
const filterWords = () => {
  const randomWords = [];
  const filterKeyWordCount = Math.random() * 5;
  for (let j = 0; j < filterKeyWordCount; j++) {
    randomWords.push(faker.lorem.paragraph().split(' ')[2]);
  }
  return randomWords;
};
const createUsers = async () => {
  const write_stream = fs.createWriteStream('users.csv')
  write_stream.write(`id|username|initials|city\n`)
  for (let i = 0; i <= 10000; i++) {
    var users = new User
    users.id = i
    if (!write_stream.write(`${users.id}|${users.username}|${users.initials}|${users.city}\n`)) {
      await new Promise((resolve) => {
        write_stream.once('drain', resolve)
      })
    }
  }
};

//createUsers();
//COPY testbase."Person"(id,reviews) FROM '/Users/harjap/Desktop/sdc/Reviews-module/database/out.csv' WITH DELIMITER='|' AND HEADER=TRUE;