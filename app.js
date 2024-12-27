const express = require('express');
const app = express();
require("dotenv").config();
const cors = require("cors");
const authRoutes = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');
const CongeRouter = require('./routes/CongeRoutes');

const mongoose = require('mongoose');
const EmplyeeRoutes = require('./routes/EmplyeeRoutes');


//.env confg
const MONGODB_URI = process.env.MONGODB_URI
const PORT = process.env.PORT || 3001
const DATABASE_NAME = process.env.DATABASE_NAME;

//cors to communicate back with front
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true ,
}));

// Serve static files from the 'uploads' folder
app.use('/uploads', express.static('./uploads'));


//Routes
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/user',userRouter);
app.use('/api',EmplyeeRoutes);
app.use('/Conge',CongeRouter);




//error handling middleware
app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error !";
  
    return res.status(statusCode).send({
      success: false,
      statusCode,
      message,
    });
});


//run the server and connect to DB
mongoose.connect(MONGODB_URI+DATABASE_NAME).then(()=> {
    console.log('connected to the database')
    app.listen(PORT,()=>{
        console.log('server is running on port 3001')
    })
}).catch(err =>{
    console.log('error connecting to database : ', err.message)
})


