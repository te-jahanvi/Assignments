const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 8080;

mongoose.connect("mongodb://localhost:27017/user_data",{ useNewUrlParser: true , useUnifiedTopology: true });
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
 
db.once('open', function() {
  console.log("Connection Successful!");
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var schema = new mongoose.Schema({ name: 'string', price: 'number' });
var PersonModel = mongoose.model('Person', schema);

app.post('/',(req,res)=>{
    const p= new PersonModel({
        name: req.body.name,
        price: req.body.price
    });
    p.save(function (err, r) {
        if (err) 
          res.status(400).json({message: 'Value not added'});
        else
          res.status(200).send(r);
      });
});

app.get('/',(req,res)=>{
  PersonModel.find({}, (err, docs) => {
    if(err)
      res.status(404).json({error: err});
    else
      res.status(200).json(docs);
  });
});

app.get('/:id',(req,res)=>{
  const name= req.params.name;
  PersonModel.findById(id, (err, docs) => {
    if(err)
      res.status(404).json({error: 'Product Not Found'});
    else
      console.log(docs);
      res.status(200).json(docs);
  });
});

app.delete('/:id',(req,res,next)=>{
  const id= req.params.id;
  Product.remove({_id: id}).exec().then(r => {
    console.log(r);
    res.status(200).json({Message: 'Deleted!'})
  }).catch( err => {
    console.log(err);
    res.status(200).json({Error: err})
  });
});

app.listen(port, () => console.log(`Listening on port ${port}!`));