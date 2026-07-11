const express=require("express");
const cors=require("cors");
const connectDB=require("./config/db.js");
require('dotenv').config();

connectDB();

const app=express();
app.use(cors());
app.use(express.json());


//routes
const problemRoutes=require("./routes/problemRoutes.js");
app.use('/api/problems',problemRoutes);


const userRoutes=require("./routes/userRoute.js");
app.use("/users",userRoutes);

const userProgressRoute=require("./routes/userProgressRoute.js");
app.use("/userprogress",userProgressRoute);

const profileRoutes = require("./routes/profile");
app.use("/api", profileRoutes);

const PORT = process.env.PORT || 5000; 
app.listen(PORT, "0.0.0.0",()=>{
    console.log(`server running in port ${PORT}`);
});