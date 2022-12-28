const express = require('express')
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000

app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.sfwvwmo.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
      
        const bloodDonor = client.db('blood_donor').collection('donors');

        app.get('/donor', async (req, res) => {
            const query = {};
            const cursor = bloodDonor.find(query)
            const donors =await cursor.toArray()
            res.send(donors);
        })


        app.get('/adminuser', async (req, res) => {
            const query = {};
            const cursor = bloodDonor.find(query)
            const donors =await cursor.toArray()
            res.send(donors);
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