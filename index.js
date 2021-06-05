/*
* 1.Tuân thủ quy tắc 2 không:
* KHÔNG sửa code
* KHÔNG chia sẻ code
* 2. CHÚNG TÔI NHẮC LẠI LÀ KHÔNG CHIA SẺ CODE DƯỚI BẤT KỲ HÌNH THỨC NÀO!
*/
const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const ReadData = require('./models/ReadData');
const Errored = require('./error');
const Schema = mongoose.Schema;
const app = express();
const port = 4000;
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');
const compression = require('compression');

var error = Errored.error("ⶇ끶๢ɠ䘍䁧ĸව將꓀萈怢肮‌怌肖愐޺ﬖ䀂̰À⌧őﳩ6䔐Ű੬鶀㩨솃⑍㐤ᢱꖇᨳ⣤祓谔");
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
mongoose.plugin(slug);
mongoose.connect(error, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});
app.use(
  compression({
    level: 6,
    threshold: 10 * 100,
    filter: (req, res) => {
      if (req.headers['x-no-compression']) {
        return false
      }
      return compression.filter(req, res);
    }
  })
)

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
  const readposts = await ReadData.find({}).sort({ _id: -1 }).limit(20)
  res.render('index', {
    readposts,
  })
})

app.get('/post', async (req, res) => {
  res.render('post');
})

app.get('/edit/:id', async (req, res) => {
  const editpost = await ReadData.findOne({ _id: req.params.id })
  res.render('edit', {
    editpost
  })
})

app.post('/delete/:id', async (req, res) => {
  await ReadData.deleteOne({ _id: req.params.id })
  res.redirect('back');
})

app.post('/post/process', async (req, res) => {
  await ReadData.create(req.body)
  console.log(req.body);
  res.redirect('back');
})


app.put('/edited/:id', async (req, res) => {
  await ReadData.updateOne({ _id: req.params.id }, req.body)
  res.redirect("/")
})


app.listen(port, () => {
  console.log(`Bấm vào Link này =>>>>> http://localhost:${port}`);
})