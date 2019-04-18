//const db = require('./index.js');
const fs = require('fs')
const path = require('path')
//const Restaurant = require('./Restaurant.js');
const mockData = require('./dataGenerator.js');


let lyrics = 'But still I\'m having memories of high speeds when the cops crashed\n' +
  'As I laugh, pushin the gas while my Glocks blast\n' +
  'We was young and we was dumb but we had heart';
fs.writeFile(path.join(__dirname,'generateddata.txt'), JSON.stringify(mockData),(err)=>{
  if(err){
    throw err
  }
  console.log('saved')
})

// const insertData = () => {
//   Restaurant.create(mockData)
//   .then((err) => {if (err) throw (err); console.log('successfully seeded data!')});
// };

// insertData();