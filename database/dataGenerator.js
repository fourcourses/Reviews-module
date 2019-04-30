/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
<<<<<<< HEAD

const faker = require('faker');
=======
const csvWriter = require('csv-write-stream');
const fs = require('fs');
const faker = require('faker');
const EventEmitter = require('events')
const emitter = new EventEmitter()
>>>>>>> 0df4c234c5474ddd87a21e3d10c0e2696d7a54ed

class Review {
  constructor() {
    this.username = faker.internet.userName(),
<<<<<<< HEAD
    this.initials = faker.name.firstName().slice(0, 1) + faker.name.lastName().slice(0, 1),
    this.profilePic = faker.internet.avatar(),
    this.city = faker.address.city(),
    this.review = faker.lorem.sentences(),
    this.noise = Math.floor(Math.random() * 3 + 1),
    this.createdAt = faker.date.past(),
    this.recommended = Math.floor(Math.random() * 60 + 40),
    this.foodRating = Math.ceil(Math.random() * 4 + 1),
    this.ambianceRating = Math.ceil(Math.random() * 4 + 1),
    this.serviceRating = Math.ceil(Math.random() * 4 + 1),
    this.valueRating = Math.ceil(Math.random() * 4 + 1),
    this.overallRating = (this.foodRating + this.ambianceRating + this.serviceRating + this.valueRating)/4,
    this.reviewCount = Math.ceil(Math.random() * 50)
=======
      this.initials = faker.name.firstName().slice(0, 1) + faker.name.lastName().slice(0, 1),
      this.profilePic = faker.internet.avatar(),
      this.city = faker.address.city(),
      this.review = faker.lorem.sentences()
    this.noise = Math.floor(Math.random() * 3 + 1),
      this.createdAt = faker.date.past(),
      this.recommended = Math.floor(Math.random() * 60 + 40),
      this.foodRating = Math.ceil(Math.random() * 4 + 1),
      this.ambianceRating = Math.ceil(Math.random() * 4 + 1),
      this.serviceRating = Math.ceil(Math.random() * 4 + 1),
      this.valueRating = Math.ceil(Math.random() * 4 + 1),
      this.overallRating = (this.foodRating + this.ambianceRating + this.serviceRating + this.valueRating) / 4,
      this.reviewCount = Math.ceil(Math.random() * 50)
>>>>>>> 0df4c234c5474ddd87a21e3d10c0e2696d7a54ed
  }
}

const makeReview = () => {
<<<<<<< HEAD
  const numberOfReviews = Math.floor(Math.random() * 20 + 1);
=======
  const numberOfReviews = Math.floor(Math.random() * 10 + 1);
>>>>>>> 0df4c234c5474ddd87a21e3d10c0e2696d7a54ed
  const results = [];
  for (let i = 0; i < numberOfReviews; i++) {
    const review = new Review();
    results.push(review);
  }
  return results;
};

const filterWords = () => {
  const randomWords = [];
  const filterKeyWordCount = Math.random() * 5;
  for (let j = 0; j < filterKeyWordCount; j++) {
    randomWords.push(faker.lorem.paragraph().split(' ')[2]);
  }
  return randomWords;
};

const mockData = [];

<<<<<<< HEAD
const createMockData = () => {
  for (let i = 0; i < 100001; i++) {
    const restaurant = {
      name: faker.company.companyName(),
      reviews: makeReview(),
      filters: filterWords()
    };
    mockData.push(restaurant);
  }
=======
const createMockData = async () => {
  const write_stream = fs.createWriteStream('out.csv')
  write_stream.write(`id,reviews\n`)
  for (let i = 0; i <= 10000000; i++) {
    const restaurant = {
      name: i,
      reviews: makeReview(),
      // filters: filterWords()
    };

    // usage
    emitter.setMaxListeners(10000000000)
    if (!write_stream.write(`${restaurant.name}|${JSON.stringify(restaurant.reviews)}\n`)) {
      await new Promise((resolve) => {
        write_stream.once('drain', resolve)
      })
    }
  }


>>>>>>> 0df4c234c5474ddd87a21e3d10c0e2696d7a54ed
};

createMockData();

module.exports = mockData;
<<<<<<< HEAD
=======
//COPY testbase."Person"(id,reviews) FROM '/Users/harjap/Desktop/sdc/Reviews-module/database/out.csv' WITH DELIMITER='|' AND HEADER=TRUE;
>>>>>>> 0df4c234c5474ddd87a21e3d10c0e2696d7a54ed
