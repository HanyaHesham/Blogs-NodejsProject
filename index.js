const express = require('express');
const mongoose= require('mongoose');
const routes = require('./routes');
const app = express();


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://hanyahesham:hanya123@cluster0.ca44f.mongodb.net/NodeProj?";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
}); 


app.use(express.json()); //express json middleware

app.use('/', routes); //setup routes


app.use('*', (req, res, next) => {            //notfound middleware
    res.status(404).json({err: 'Not_found'});    
});

//error handler middleware
app.use((err, req, res, next)=>{    
    console.error(err);
    if (err instanceof mongoose.Error.ValidationError) {
      return res.status(422).json(err.errors);
    }
    else if (err.code === 11000) {
      res.status(422).json({ statusCode: 'ValidationError', property: err.keyValue });
    }
    else if (err.message === 'UN_AUTHENTICATED') {
      res.status(401).json({ statusCode: 'UN_AUTHENTICATED' });
    }
    res.status(503).end(); //server error
});

const { PORT=3000 } = process.env;
app.listen(3000, ()=>{
    console.log('App is ready on:', PORT);
})