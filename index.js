/*
* 1.Tuân thủ quy tắc 2 không:
* KHÔNG sửa code
* KHÔNG chia sẻ code
* 2. CHÚNG TÔI NHẮC LẠI LÀ KHÔNG CHIA SẺ CODE DƯỚI BẤT KỲ HÌNH THỨC NÀO!
*/
const express = require('express');
const ejs = require('ejs');
const helmet = require("helmet");
const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const ReadData = require('./models/ReadData');
const Errored = require('./error');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');
const compression = require('compression');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser')

const newPostController = require('./controllers/newPost')
const editPostController = require('./controllers/editPost')
const deletePostController = require('./controllers/deletePost')
const storePostController = require('./controllers/storePost')
const newPostProcessController = require('./controllers/newPostProcess')
const putEditPostController = require('./controllers/putEditPost')
const registerPostController = require('./controllers/register')
const storeAdminPostController = require('./controllers/storeAdmin')
const loginAdminController = require('./controllers/login')
const loginAdminProcessController = require('./controllers/loginAdmin')
const authMiddleware = require('./middleware/authMiddleware')
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware')
const logoutController = require('./controllers/logout')



var error = Errored.error("ⶇ끶๢ɠ䘍䁧ĸව將꓀萈怢肮‌怌肖愐޺ﬖ䀂̰À⌧őﳩ6䔐Ű੬鶀㩨솃⑍㐤ᢱꖇᨳ⣤祓谔");
mongoose.plugin(slug);
mongoose.connect(error, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

app.use(cookieParser())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(helmet());

app.use(helmet.contentSecurityPolicy());
app.use(helmet.dnsPrefetchControl());
app.use(helmet.expectCt());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());
app.set('trust proxy', 1) // trust first proxy
app.use(expressSession({
  secret: 'keyboard cat'
}))
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

app.get('/', authMiddleware, storePostController)

app.get('/post', authMiddleware, newPostController)

app.get('/edit/:id', authMiddleware, editPostController)

app.post('/delete/:id', authMiddleware, deletePostController)

app.post('/post/process', authMiddleware, newPostProcessController)

app.put('/edited/:id', authMiddleware, putEditPostController)

app.get('/register', redirectIfAuthenticatedMiddleware, registerPostController)

app.post('/users/register', redirectIfAuthenticatedMiddleware, storeAdminPostController)

app.get('/login', redirectIfAuthenticatedMiddleware, loginAdminController)

app.post('/users/login', redirectIfAuthenticatedMiddleware, loginAdminProcessController)

app.get('/logout', logoutController)

app.use((req, res) => res.redirect('/'));

global.loggedIn = null;
app.use("*", (req, res, next) => {
  loggedIn = req.session.userId;
  next()
});

let port = process.env.PORT;
if (port == null || port == "") {
port = 4000;
}
app.listen(port, ()=>{
console.log('App listening...')
})
