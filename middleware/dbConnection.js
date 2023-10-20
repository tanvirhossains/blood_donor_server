const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// const uri = process.env.ATLAS_URI
// const uri = 'mongodb://loca  lhost:27017'
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.sfwvwmo.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1
})

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.sfwvwmo.mongodb.net/?retryWrites=true&w=majority`;
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

let dbConnection;

module.exports = {
    connectToServer: function (callback) {
        client.connect(function (err, db) {

            if (err || !db) {
                return callback(err)
            }

            dbConnection = db.db("blood_donor");
            console.log("successfully connected to server!!");
            return callback();
        })
    },



    bloodDonorDb: function () {
        return dbConnection;
    }


}