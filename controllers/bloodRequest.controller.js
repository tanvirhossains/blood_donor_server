const { bloodDonorDb } = require("../middleware/dbConnection")

module.exports.getAllBloodRequest = async (req, res, next) => {
    const db = bloodDonorDb()
    const query = {};
    const cursor = db.collection('bloodRequest').find(query).sort({ bloodDate: -1 })
    const bloodRequests = await cursor.toArray()
    res.send(bloodRequests);
}

module.exports.postBloodRequest = async (req, res, next) => {

    const db = bloodDonorDb()
    const data = req.body
    console.log(data);
    const result = await db.collection('bloodRequest').insertOne(data)
    res.send(result)
    console.log("requst inserted")
}