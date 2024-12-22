const express=require('express');
const cors=require('cors');
const { connect } = require("./mongoDB/db"); // Import the connection function
const route=require('./routes')
const app=express();

connect();


app.use(cors())
app.use('/api',route)

app.listen(5000,()=>{
    console.log("Server running on port 5000");
})