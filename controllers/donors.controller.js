const { ObjectId } = require("mongodb");
const { bloodDonorDb } = require("../middleware/dbConnection");


const resposeSender = (data) => {
    console.log("Sending");
    res.send(data);
    // res.status(200).send({
    //     success: true,
    //     message: 'Data found',
    //     data: data
    // })
    // res.status(500).send({
    //     success: false,
    //     message: 'internal error',
    // })

};

module.exports.getAllDonors = async (req, res, next) => {

    try {
        const db = bloodDonorDb()
        // console.log(db);

        // ----------- single user query---------------------
        if (req.query.email) {
            const userEmail = req.query.email
            // console.log(userEmail);
            const query = { email: userEmail };
            const userInfo = await db.collection('donors').findOne(query)
            // const createIndex = db.collection.createIndex({ email: 1 })
            console.log(userInfo);
            if (userInfo === null) {
                res.status(200).json({
                    success: true,
                    message: "Successfully",
                    data: userInfo
                })
                resposeSender("null")

            } else {
                res.status(200).json({
                    success: true,
                    message: "Successfully not connected",
                    data: userInfo
                })
                // resposeSender(userInfo)
            }

        }
        else {
            const query = {};
            const cursor = db.collection('donors').find().sort({ role: -1, name: 1 })
            // const createIndex = db.collection('donors').createIndex({ email: 1 })
            // console.log(createIndex);
            const donors = await cursor.toArray()
            res.status(200).json({ success: true, message: "Successfully gotten data", data: donors })
            // console.log("donors");
            // resposeSender(donors)
        }
        // res.send('response called insinde the contorller')


    } catch (error) {
        next(error);

    }

}

module.exports.saveNewDonor = async (req, res) => {

    try {
        const db = bloodDonorDb()
        const data = req.body
        const result = await db.collection('donors').insertOne(data)
        res.send(result)
    } catch (error) {

    }
}

module.exports.updateDonorData = async (req, res) => {
    console.log("updateDonorData");
    const db = bloodDonorDb()
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
    const result = await db.collection('donors').updateOne(filter, updateDoc, options);
    console.log("data updated");
    res.send(result)

    // res.send('single donor called insinde the contorller')
    // res.status(200).send({
    //     success: true,
    //     message: 'Donor found',
    //     data: theDate
    // })
    // res.status(500).send({
    //     success: false,
    //     message: 'internal error',
    // })
}




module.exports.adminDonor = async (req, res) => {




    try {
        const db = bloodDonorDb()

        console.log("database value in the>>>>>>>>", db);

        // const query = { role: "admin" };
        const query = { role: "admin" };
        const cursor = db.collection('donors').find(query);
        const adminDon = await cursor.toArray()
        // console.log(adminDon);
        res.send(adminDon)


        // ----------- single user query---------------------
        // if (req.query.email) {
        //     const userEmail = req.query.email
        //     const query = { email: userEmail };
        //     const userInfo = await db.collection('donors').findOne(query)
        //     // const createIndex = db.collection.createIndex({ email: 1 })
        //     if (userInfo === null) {
        //         res.status(200).json({
        //             success: true,
        //             message: "Successfully",
        //             data: userInfo
        //         })
        //         resposeSender("null")

        //     } else {
        //         res.status(200).json({
        //             success: true,
        //             message: "Not connected",
        //             data: userInfo
        //         })
        //         // resposeSender(userInfo)
        //     }

        // }
        // else {
        //     const query = {role: "admin"};
        //     const cursor = db.collection('donors').find().project({ _id: 0 }).sort({ name: 1 })
        //     const createIndex = db.collection('donors').createIndex({ email: 1 })
        //     console.log(createIndex);
        //     const donors = await cursor.toArray()
        //     res.status(200).json({ success: true, message: "Successfully gotten data", data: donors })
        //     // console.log("donors");
        //     // resposeSender(donors)
        // }
        // // res.send('response called insinde the contorller')


    } catch (error) {
        next(error);

    }


}




module.exports.updateAdminRole = async (req, res) => {

    try {
        console.log("data received");
        const db = bloodDonorDb()
        const roleId = req.query.id
        const newRole = req.body.role
        const filter = { _id: new ObjectId(roleId) }
        const option = { upsert: true } // if field is not exist then add new field
        const updateDoc = {
            $set: {
                role: newRole
            }
        }
        console.log(newRole);
        const updatedResult = await db.collection("donors").updateOne(filter, updateDoc, option);
        console.log("role updated successfully");
        res.status(200).json({ success: true, message: "Successfully Role updated", data: updatedResult })


    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'internal error',
        })
    }
}













//---------------------------------------------------------------- we can export all functions this way then we have to export all functions in this type or otherwise we can export all functions upper ways

// getDonors = async (req, res) => {
//     res.send("donors gotten insided of the mr  contorller")
// }

// module.exports = {
//   getDonors
// }