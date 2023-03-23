const express = require("express");
const app = express();
require('dotenv').config();

require('./src/exception')();
require('./src/routes')(app);
require('./src/db')();

app.get('/', (req,res)=>{
    res.send("Healthy");
});

const port = process.env.PORT;

app.listen(port, ()=> {
    console.log(`Listening on port ${port}`);
});