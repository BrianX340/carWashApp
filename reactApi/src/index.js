require('dotenv').config()
const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const cors = require("cors")
const mongoose = require('mongoose')

try {
    var URI;
    URI = process.env.LOCAL_MONGO == 'true' ? process.env.MONGO_URI_LOCAL : process.env.MONGO_URI_CLOUD;
    mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
} catch (err) {
    console.log(err)
}

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors())

// ENRUTADORES
const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRouter");

// RUTAS
app.use("/", authRouter);
app.use("/user", userRouter);

app.use("/*", (req, res) => {
    res.status(404).json({
        status: 404,
        error: "Not found"
    });
});

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});