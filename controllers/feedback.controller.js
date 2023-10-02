const { ObjectId } = require("mongodb");
const { bloodDonorDb } = require("../middleware/dbConnection");


module.exports.getAllFeedback = async (req, res, next) => {
    try {

        const { limit } = req.query
        const db = bloodDonorDb()
        // const query = {};
        const cursor = db.collection('feedback').find().limit(+limit).project({ _id: 0 }).sort({ feedbackDate: -1, feedbacktime: -1 })
        const feedbacks = await cursor.toArray()
        // res.send(feedbacks.ops[0]);
        res.status(200).json({ success: true, feedbacks });

    } catch (error) {
        next(error)
    }
}


module.exports.postAFeedback = async (req, res, next) => {
    const db = bloodDonorDb()
    const feedback = req.body;
    const result = await db.collection('feedback').insertOne(feedback);
    // res.send(result.ops[0]);
    res.status(200).json({ success: true, data: result });
}


// /:id
module.exports.getFeedbackById = async (req, res, next) => {

    try {
        const db = bloodDonorDb()
        const { id } = req.params
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid ID" });
        }
        const query = { _id: ObjectId(id) };
        const result = await db.collection('feedback').findOne(query);

        if (!result) {
            return res.status(404).json({ success: false, message: "Feedback not found" });
        }

        res.status(200).json({ success: true, data: result });


    } catch (error) {
        next(error);
    }

}
module.exports.patchFeedback = async (req, res, next) => {

    try {
        const db = bloodDonorDb()
        const { id } = req.params
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid ID" });
        }
        const query = { _id: ObjectId(id) };
        const feedback = await db.collection('feedback').updateOne(query, { $set: req.body }, { upsert: false });

        if (!feedback.modifiedCount) {
            return res.status(404).json({ success: false, message: "Couldn't update the feedback" });
        }

        res.status(200).json({ success: true, data: feedback });


    } catch (error) {
        next(error);
    }

}