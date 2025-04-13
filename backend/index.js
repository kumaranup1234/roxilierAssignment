const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./src/routes/authRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const ownerRoutes = require('./src/routes/ownerRoutes');
const userRoutes = require('./src/routes/userRoutes');
dotenv.config();
const cors = require('cors')
const {connectDB} = require("./src/models");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/owner', ownerRoutes);
app.use('/api/user', userRoutes);

connectDB().then( () => {
    console.log("Database Connected");
})


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});