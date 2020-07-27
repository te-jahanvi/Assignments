const express = require('express');
const bodyParser = require('body-parser');
const { Pool, Client } = require('pg');
const path = require('path');
const cors = require('cors');
const ejs = require('ejs');


const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "jahanvi",
  password: "jahanvi",
  port: 5432
});

const app = express();
const port = 8080;

app.use(express.static('./public'));
// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.set('view engine', 'ejs');

//Adding Data
app.post('/members', (req, res) => {
  try{
    const newMem= {
      id: req.body.id,
      name: req.body.name,
      email: req.body.email    
    }
    const data= pool.query("INSERT INTO members values ($1, $2, $3)", [newMem.id, newMem.name, newMem.email]);
    res.send('DONE!');
  }
  catch(err){
    console.error(err.message);
  }
});

//Retrieving all Data
app.get('/members', async(req,res) => {
  try{
    const data=  await pool.query("SELECT * from members");
    res.render('view', {'users': data.rows});
  }
  catch(e){
    console.error(e.message);
  }
});

//Retrieving Specific Data

app.get('/members/:id', async(req,res) => {
  const id= req.params.id;
  try{
    const data=  await pool.query("SELECT * from members where id = $1", [id]);
    res.render('search', {'users': data.rows});
  }
  catch(e){
    console.error(e.message);
  }
});

//Update Data
app.post('/members-update', async(req,res) => {
  try{
    console.log('working');
      res.sendFile(path.join(__dirname + '/public' + '/update.html'));
     
      const id= req.body.id;
      const name= req.body.name;
      const email= req.body.email;
    
    const data=  await pool.query("UPDATE members set name= $1, email= $2 where id = $3", [name, email, id]);
    console.log(data);
    //res.render('update', {'users': data.rows});
  }
  catch(e){
    console.error(e.message);
  }
});

//Deleting Data
app.post('/members-delete', async(req,res) => {
  try{
    res.sendFile(path.join(__dirname + '/public' + '/delete.html'));
    const id= req.body.id;
    
    const data1=  await pool.query("DELETE from members where id = $1 ", [id]);

  }
  catch(e){
    console.error(e.message);
  }
});


app.listen(port, () => console.log(`Listening on port ${port}!`));