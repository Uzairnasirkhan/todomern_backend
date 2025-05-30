require("dotenv").config()
const express = require('express');
const cors = require("cors");
const mongoose = require("mongoose")
const TodoRouter = require("./routes/TodoRouter")
const authRouter = require("./routes/authRouter")


const App = express()
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://merntodoapp-delta.vercel.app"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

App.use(cors(corsOptions));

App.use(express.json());

App.use("/todo", TodoRouter);
App.use("/auth", authRouter);

App.get("/", (req, res) => {
    res.send(
    {
        message: "Hello World"
    })
});


mongoose
.connect(process.env.MONGO_URI).
then(()=>{
    const PORT = process.env.PORT || 3000;

    App.listen(PORT, () => {
        console.log(`✅ Server started on port ${PORT}`);
    });

})
.catch((error)=>{
    console.log(error)
})

