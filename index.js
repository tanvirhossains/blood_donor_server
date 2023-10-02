const express = require('express')
const cors = require('cors');
require('dotenv').config()
// const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT || 9000


// ---------------------------------------------------------------- exported functions ----------------------------------------------------------------
const donorRouter = require('./routes/v1/donor.route');
const feedbackRouter = require('./routes/v1/feedback.route');
const commentsRouter = require('./routes/v1/comment.route');
const bloodRequestRouter = require('./routes/v1/bloodRequest.route');

const viewCount = require('./middleware/viewcount');
const errorHandler = require('./middleware/errorHandler');
const { connectToServer } = require('./middleware/dbConnection');

app.use(cors());
app.use(express.json());

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.sfwvwmo.mongodb.net/?retryWrites=true&w=majority`;
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// app.use(viewCount);

// dbConnection();

connectToServer((err) => {
    if (!err) {
        app.listen(port, () => {
            console.log(`Blood Donor listening on port ${port}`)
        })
    } else {
        console.log("line:35", err);
    }
})

console.log("server listening on port");

app.use('/api/v1/donors', donorRouter)
app.use('/api/v1/feedbacks', feedbackRouter);
app.use('/api/v1/comments', commentsRouter);
app.use('/api/v1/bloodRequest', bloodRequestRouter);



async function run() {
    try {
        // const donorCollection = client.db('blood_donor').collection('donors');
        // const feedbackCollection = client.db('blood_donor').collection('feedback');
        // const commentsCollection = client.db('blood_donor').collection('comments');
        // const bloodRequestCollection = client.db('blood_donor').collection('bloodRequest');


        // //---------------------------------------------------------------- donors collection --------------------------------
        // // getting all/specific user by query 
        // // http://localhost:5000/donors?email= 
        // app.get('/donors', async (req, res) => {

        //     //----------- single user query ---------------------
        //     if (req.query.email) {
        //         const userEmail = req.query.email
        //         const query = { email: userEmail };
        //         const userInfo = await donorCollection.findOne(query)
        //         if (userInfo === null) {
        //             res.send("null")
        //         } else {
        //             res.send(userInfo);
        //         }

        //     }
        //     else {
        //         const query = {};
        //         const cursor = donorCollection.find(query).sort({ email: 1 })
        //         const donors = await cursor.toArray()
        //         res.send(donors);
        //     }
        // })


        // // ---------------------------------------------------------------- new donro post request----------------------------------------------------------------
        // app.post('/donor', async (req, res) => {
        //     const data = req.body
        //     console.log(data);
        //     const result = await donorCollection.insertOne(data)
        //     res.send(result)
        // })


        // //http://localhost:5000/donor/email 
        // // updating the date 
        // app.put('/donor/:email', async (req, res) => {
        //     const uEmail = req.params.email
        //     const data = req.body
        //     console.log(data);
        //     const filter = { email: uEmail };
        //     const options = { upsert: true };// if field not exist then will create new one
        //     const updateDoc = {
        //         $set: {
        //             ...data  // for getting all data from the body and inputting to server
        //         },
        //     };
        //     const result = await donorCollection.updateOne(filter, updateDoc, options);
        //     console.log("data updated");
        //     res.send(result)
        // })


        // // http://localhost:5000/admin
        // // app.get('/admin', async (req, res) => {
        // //     const query = { designation: "main" };
        // //     const cursor = donorCollection.find(query)
        // //     const donors = await cursor.toArray()
        // //     res.send(donors);
        // // })


        // // ---------------------------------------------------------------- admin routes

        // app.get('/admin', async (req, res) => {
        //     const query = { role: "admin" };
        //     const cursor = donorCollection.find(query)
        //     const donors = await cursor.toArray()
        //     res.send(donors);

        // })

        // //-------------------------------------- feedback routes----------------------------------------------------------------

        // app.get('/feedbacks', async (req, res) => {
        //     const query = {};
        //     const cursor = feedbackCollection.find(query)
        //     const feedbacks = await cursor.toArray()
        //     res.send(feedbacks);
        // })


        // //----- ------------------------- Comments routes

        // app.get('/comments', async (req, res) => {
        //     const query = {}
        //     const cursor = commentsCollection.find(query)
        //     const comments = await cursor.toArray()
        //     console.log("cmments sended ");
        //     res.send(comments);
        // })


        // // http://localhost:5000/donor
        // app.post('/comment', async (req, res) => {
        //     const data = req.body
        //     console.log(data);
        //     const result = await commentsCollection.insertOne(data)
        //     res.send(result)
        //     console.log("comment inserted")
        // })

        // // ---------------------------------------------------------------- create a new user object----------------------------------------------------------------
        // app.post('/newuser', async (req, res) => {
        //     const data = req.body
        //     console.log(data);
        //     const result = await donorCollection.insertOne(data)
        //     res.send(result)
        //     console.log("data inserted")
        // })


        // // ---------------------------------------------------------------- create a new feedback --------------------------------
        // app.post('/feedback', async (req, res) => {
        //     const data = req.body
        //     console.log(data);
        //     const result = await feedbackCollection.insertOne(data)
        //     res.send(result)
        //     console.log("data inserted")
        // })

        // //---------------------------------------------------------------- Blood Request routes --------------------------------
        // app.post('/request', async (req, res) => {
        //     const data = req.body
        //     console.log(data);
        //     const result = await bloodRequestCollection.insertOne(data)
        //     res.send(result)
        //     console.log("requst inserted")
        // })

        // app.get('/requestedBlood', async (req, res) => {
        //     const query = {};
        //     const cursor = bloodRequestCollection.find(query)
        //     const bloodRequests = await cursor.toArray()
        //     res.send(bloodRequests);
        // })



        // // ---------------------------------------------------------------- admin put request----------------------------------------------------------------
        // app.put('/admin/:id', async (req, res) => {
        //     const ide = req.params.id
        //     const data = req.body.role
        //     const filter = { _id: new ObjectId(ide) };
        //     const options = { upsert: true };// if field not exist then will create new one
        //     const updateDoc = {
        //         $set: {
        //             role: data
        //         },
        //     };
        //     console.log(data);
        //     const result = await donorCollection.updateOne(filter, updateDoc, options);
        //     console.log("data updated");
        //     res.send(result)
        // })


        // //http://localhost:5000/donor/63a1484667a68f018950b21e  _id
        // app.delete('/admin/:id', async (req, res) => {
        //     const ide = req.params.id
        //     const query = { _id: ObjectId(ide) };
        //     const result = await donorCollection.deleteOne(query);
        //     res.send(result)
        // })

    } finally {
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Hello Blood Donor web!')
})

// if called route not exist then this will show 
app.all('*', (req, res) => {
    res.send('No Routes found')
})

app.use(errorHandler) // all error will be handled in this middleware function

// app.listen(port, () => {
//     console.log(`Blood Donor listening on port ${port}`)
// })

// if any error is arised and that can not be handled then it is condider in this middleware function
process.on('unhandledRejection', (error) => {
    console.log(error.message, error.name);
    // app.close(() => {
    //     process.exit(1);
    // });
})