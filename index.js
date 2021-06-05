const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const ReadData = require('./models/ReadData');
const Schema = mongoose.Schema;
const app = express();
const port = 4000;
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
mongoose.plugin(slug); 
mongoose.connect('mongodb+srv://BaQuocLinux:BaQuoc@3011***@cluster0.dmmrs.mongodb.net/travel', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(methodOverride('_method'))

app.get('/',async (req, res) => {
  const readposts = await ReadData.find({}).sort({_id:-1}).limit(20)
  res.render('index',{
    readposts,
  })
})

app.get('/post',async (req, res) => {
  res.render('post');
})

app.get('/edit/:id',async (req, res) => {
 // console.log(req.params.id)
  const editpost = await ReadData.findOne({_id: req.params.id})
  console.log(editpost._id);
  res.render('edit', {
    editpost
  })

  
})

app.post('/delete/:id',async (req, res) => {
  await ReadData.deleteOne({ _id: req.params.id})
  res.redirect('back');
})
app.post('/post/process', async(req,res)=>{
  await ReadData.create(req.body)
  console.log(req.body);
  res.redirect('back');
})


app.put('/edited/:id',async (req, res) => {
  await ReadData.updateOne({_id: req.params.id}, req.body)
  res.redirect("/")
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})