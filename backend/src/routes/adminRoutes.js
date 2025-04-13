const express = require('express');
const {
    createStore,
    getAllStores,
    getSingleStore,
    updateStore,
    deleteStore,
    createUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
    getDashboardStats,
    getAllRatings
} = require('../controller/adminController');

const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();

// Only accessible by admin
router.use(verifyToken, authorizeRoles('admin'));

// Dashboard
router.get('/dashboard', getDashboardStats);

// Store Management
router.post('/stores', createStore);
router.get('/stores', getAllStores);
router.get('/stores/:id', getSingleStore);
router.put('/stores/:id', updateStore);
router.delete('/stores/:id', deleteStore);

// User Management
router.post('/users', createUser);
router.get('/users', getAllUsers);
router.get('/users/:id', getSingleUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

// Ratings
router.get('/ratings', getAllRatings);

module.exports = router;
