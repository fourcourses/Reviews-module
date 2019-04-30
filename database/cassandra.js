var ExpressCassandra = require('express-cassandra')
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
var MyModel = models.loadSchema("reviews", {
  fields: {
    id: "int",
    reviews: "text",
  },
  key: ["id"]
})
console.log(models.instance.Person === MyModel)
MyModel.syncDB(function (err, result) {
  if (err) {
    throw err;
  }
})
module.exports = models