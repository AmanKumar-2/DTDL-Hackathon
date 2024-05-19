const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const userRoutes = require("./routes/UserRoutes")

const app = express()
app.use(cors())
app.use(express.json())


mongoose.connect("mongodb://localhost:27017/netflix")
    .then(() => {
        console.log('Connected to MongoDB');
    })

app.use("/api/user", userRoutes)

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

