const db = require('./connection.js')
db.query(`COPY reviews FROM '/Users/harjap/Desktop/sdc/Reviews-module/database/postgreSQL/reviews.csv' (FORMAT CSV, DELIMITER ('|'), HEADER);`)
  .then(() => console.log('restaurants loaded!'));