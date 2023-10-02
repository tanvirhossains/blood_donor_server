const { bloodDonorDb } = require("../middleware/dbConnection")

// const db = bloodDonorDb()

module.exports.getAllComments = async (req, res, next) => {

    try {

        const db = bloodDonorDb()
        const query = {}
        const cursor = db.collection('comments').find(query)
        const comments = await curso.toArray()
        console.log("cmments sended ");
        res.send(comments);

    } catch (error) {
        next()
    }
}

module.exports.addComment = async (req, res, next) => {
    try {

        const db = bloodDonorDb()
        const data = req.body
        console.log(data);
        const result = await db.collection('comments').insertOne(dat)
        res.send(result)
        console.log("comment inserted")
    } catch (error) {
        next()
    }
}