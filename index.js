const express = require('express')
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT || 9000

app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.sfwvwmo.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        const bloodDonor = client.db('blood_donor').collection('donors');


        // getting all/specific user by query 
        // http://localhost:5000/donors?email= 
        app.get('/donors', async (req, res) => {
            // const query = {};// both are same
            // const search = req.query.email
            // console.log(search);
            // console.log("serching donora");
            // const q = req.query
            // console.log(q);
            // const cursor = bloodDonor.find({name:"Tanvir Hossain"})
            // const cursor = bloodDonor.find({bldGroup:"A-"})

            //----------- single user query ---------------------
            if (req.query.email) {
                console.log("line>", "in side the query");
                const userEmail = req.query.email
                const query = { email: userEmail };
                const userInfo = await bloodDonor.findOne(query)
                console.log(userInfo);

                if (userInfo === null) {
                    res.send("null")
                } else {

                    res.send(userInfo);
                }

            }
            else {
                const query = {};
                const cursor = bloodDonor.find(query)
                const donors = await cursor.toArray()
                res.send(donors);
            }
        })


        // http://localhost:5000/admin
        // app.get('/admin', async (req, res) => {
        //     const query = { designation: "main" };
        //     const cursor = bloodDonor.find(query)
        //     const donors = await cursor.toArray()
        //     res.send(donors);
        // })

        app.get('/admin', async (req, res) => {
            const query = { role: "admin" };
            const cursor = bloodDonor.find(query)
            const donors = await cursor.toArray()
            res.send(donors);

        })


        // http://localhost:5000/donor
        app.post('/donor', async (req, res) => {
            const data = req.body
            console.log(data);
            const result = await bloodDonor.insertOne(data)
            res.send(result)
            console.log("data inserted")
        })

        //➡️➡️➡️created new user by registration/signup
        app.post('/newuser', async (req, res) => {
            const data = req.body
            console.log(data);
            const result = await bloodDonor.insertOne(data)
            res.send(result)
            console.log("data inserted")
        })

        //http://localhost:5000/donor/email 
        // updating the date 
        app.put('/donor/:email', async (req, res) => {
            const uEmail = req.params.email
            const data = req.body
            console.log(data);
            const filter = { email: uEmail };
            const options = { upsert: true };// if field not exist then will create new one
            const updateDoc = {
                $set: {
                    ...data  // for getting all data from the body and inputting to server
                },
            };
            const result = await bloodDonor.updateOne(filter, updateDoc, options);
            console.log("data updated");
            res.send(result)
        })


        //http://localhost:5000/donor/63a1484667a68f018950b21e  _id

        app.delete('/donor/:id', async (req, res) => {
            const ide = req.params.id
            const query = { _id: ObjectId(ide) };
            const result = await bloodDonor.deleteOne(query);
            res.send(result)
        })

    } finally {

    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Hello Blood Donor web!')
})

app.listen(port, () => {
    console.log(`Blood Donor listening on port ${port}`)
})