const { MongoClient, ServerApiVersion } = require("mongodb");
const Db = process.env.ATLAS_URI;
const client = new MongoClient(Db, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }});
var _db;

module.exports = {
  connectToServer: async function () {
    console.log('yoyo');
    await client.connect();
    // Send a ping to confirm a successful connection
    _db = await client.db("neighborhood_fund");
    
    /*client.connect(function (err, db) {
      // Verify we got a good "db" object
      console.log('hello');
      if (db) {
        _db = db.db("employees");
        console.log("Successfully connected to MongoDB.");
      }
      return callback(err);
    });*/
  },

  getDb: function () {
    return _db;
  },
};
