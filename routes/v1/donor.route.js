const express = require('express');


const donorRouter = express.Router()
const donorController = require('../../controllers/donors.controller');
const viewCount = require('../../middleware/viewcount');

// donorRouter.get('/', (req, res) => {
//     res.send("donors found")
// })
donorRouter.route('/:email')
    .put( donorController.updateDonorData)


donorRouter.route('')
    .get(viewCount,donorController.getAllDonors)
    .post(viewCount, donorController.saveNewDonor)




donorRouter.route('/admin')
    .get( donorController.adminDonor)
    // .get(viewCount, donorController.adminDonor)



module.exports = donorRouter;
// donorRouter.route('/')
// .get()
