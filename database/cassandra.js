var ExpressCassandra = require('express-cassandra')
const mockData = require('./dataGenerator.js')
var models = ExpressCassandra.createClient({
  clientOptions: {
    contactPoints: ["127.0.0.1"],
    protocolOptions: {
      port: 9042
    },
    keyspace: 'testbase',
    queryOptions: {
      consistency: ExpressCassandra.consistencies.one
    }
  },
  ormOptions: {
    defaultReplicationStrategy: {
      class: 'SimpleStrategy',
      replication_factor: 1
    },
    migration: 'safe'
  }
})
var MyModel = models.loadSchema('Person', {
  fields: {
    name: "int",
    reviews: {
      type: "list",
      typeDef: "<text>"
    },
  },
  key: ["name"]
})
console.log(models.instance.Person === MyModel)
MyModel.syncDB(function (err, result) {
  if (err) {
    throw err;
  }
})
var john = new models.instance.Person({
  name: mockData.name,
    reviews: mockData.reviews
  }
);
john.save(function (err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Yuppiie!');
  return
}).then((err) => {
  if (err) throw (err);
  console.log('successfully seeded data!')
});

// models.instance.Person.findOne({name: 'John'}, function(err, john){
//   if(err) {
//       console.log(err);
//       return;
//   }
//   //Note that returned variable john here is an instance of your model,
//   //so you can also do john.delete(), john.save() type operations on the instance.
//   return ('Found ' + john.name + ' to be ' + john.age + ' years old!');
// });
module.exports = models