const express = require('express'),
      path = require('path'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      mongoose = require('mongoose');
      config = require('../db')

const mongoDb = config.DB;


const app = express();
mongoose.Promise = global.Promise;

mongoose.connect(mongoDb, { useNewUrlParser: true }).then(()=>{
    console.log('Database is connected');
},(err)=>{
    console.log('There is problem connecting to database');
})

const employeeRoutes = require('../Routes/Employee.route');

app.use(bodyParser.json());

app.use(cors());

const port = process.env.PORT || 4000;

app.use('/employees', employeeRoutes);

const server = app.listen(port, function(){
    console.log(`server is up and running at port ${port}`)
})

// To run use -- cd server then nodemon server.js