const express = require('express');
const { getAllRatings, storeAverageRating } = require("../controller/ownerController");
const {authorizeRoles, verifyToken} = require("../middleware/authMiddleware");
const router = express.Router();

router.use(verifyToken, authorizeRoles('store_owner'));

router.get('/ratings', getAllRatings);
router.get('/store', storeAverageRating)


module.exports = router;