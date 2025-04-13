const express = require('express');
const {getAllStores, getSingleStore,
    submitRating, getAllRatings,
    updatePassword
} = require("../controller/userController");
const {verifyToken} = require("../middleware/authMiddleware");
const router = express.Router();

router.use(verifyToken);
// Store listings + info
router.get('/stores', getAllStores);
router.get('/stores/:id', getSingleStore);

// Ratings
router.post('/stores/:id/rate', submitRating);
router.get('/me/ratings', getAllRatings);

// Update Password
router.put('/me/password', updatePassword);



module.exports = router;