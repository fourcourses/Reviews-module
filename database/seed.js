//const db = require('./index.js');
const fs = require('fs')
const path = require('path')
const csvWriter = require('csv-write-stream')
//const Restaurant = require('./Restaurant.js');
const mockData = require('./dataGenerator.js');

// const writer = csvWriter({header:['filters','reviews']})
// writer.pipe(fs.createWriteStream('out.csv'))
// writer.write(mockData)
// writer.end()
var writer = csvWriter()
writer.pipe(fs.createWriteStream('out.csv'))
writer.write({hello: "world", foo: "bar", baz: "taco"})
writer.end()
// function arrayToCSV(objArray) {
//   const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
//   let str = `${Object.keys(array[0]).map(value => `"${value}"`).join(",")}` + '\r\n';

//   return array.reduce((str, next) => {
//     str += `${Object.values(next).map(value => `"${value}"`).join(",")}` + '\r\n';
//     return str;
//   }, str);
// }
// let lyrics = 'But still I\'m having memories of high speeds when the cops crashed\n' +
//   'As I laugh, pushin the gas while my Glocks blast\n' +
//   'We was young and we was dumb but we had heart';
// fs.writeFile(path.join(__dirname, 'generateddata.txt'), JSON.stringify(mockData), (err) => {
//   if (err) {
//     throw err
//   }
//   console.log('saved')
// })

// const insertData = () => {
//   Restaurant.create(mockData)
//   .then((err) => {if (err) throw (err); console.log('successfully seeded data!')});
// };

// insertData();