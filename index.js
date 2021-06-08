/*
* 1.Tuân thủ quy tắc 2 không:
* KHÔNG sửa code
* KHÔNG chia sẻ code
* 2. CHÚNG TÔI NHẮC LẠI LÀ KHÔNG CHIA SẺ CODE DƯỚI BẤT KỲ HÌNH THỨC NÀO!
*/
const express = require('express')
const ejs = require('ejs')
const helmet = require("helmet")
const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
const Errored = require('./error')
const methodOverride = require('method-override')
const path = require('path')
const compression = require('compression')
const cookieSession = require('cookie-session')
const cors = require('cors')
const nocache = require("nocache")
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
const xXssProtection = require("x-xss-protection");
const contentSecurityPolicy = require("helmet-csp");

const app = express()

const ReadData = require('./models/ReadData');
//CLIENT CONTROLLERS
const indexController = require('./controllers/client/index')
const postController = require('./controllers/client/post')

//ADMIN CONTROLLERS
const newPostController = require('./controllers/admin/newPost')
const editPostController = require('./controllers/admin/editPost')
const deletePostController = require('./controllers/admin/deletePost')
const storePostController = require('./controllers/admin/storePost')
const newPostProcessController = require('./controllers/admin/newPostProcess')
const putEditPostController = require('./controllers/admin/putEditPost')
const registerPostController = require('./controllers/admin/register')
const storeAdminPostController = require('./controllers/admin/storeAdmin')
const loginAdminController = require('./controllers/admin/login')
const loginAdminProcessController = require('./controllers/admin/loginAdmin')
const authMiddleware = require('./middleware/authMiddleware')
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware')
const logoutController = require('./controllers/admin/logout')



var error = Errored.error("ⶇ끶๢ɠ䘍䁧ĸව將꓀萈怢肮‌怌肖愐޺ﬖ䀂̰À⌧őﳩ6䔐Ű੬鶀㩨솃⑍㐤ᢱꖇᨳ⣤祓谔");
mongoose.plugin(slug);
mongoose.connect(error, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});


app.use(nocache());
app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(xXssProtection());
app.use((req, res, next) => {
  res.setHeader("X-XSS-Protection", "1; mode=block");
  next();
});

app.use(
  contentSecurityPolicy({
    useDefaults: true,
    directives: {
      defaultSrc: ["'self'", "*"],
      scriptSrc: ["'self'", "ajax.googleapis.com", "google.com", "cdn.jsdelivr.net"],
      frameSrc: ["https://*.google.com"],
      objectSrc: ["'none'"],
      imgSrc: ["'self' data:", "data:image/svg+xml"],
      upgradeInsecureRequests: [],
    },
    reportOnly: false,
  })
);

app.use(helmet.dnsPrefetchControl());
app.use(helmet.expectCt());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.referrerPolicy());


var expiryday = new Date(Date.now() + 60 * 60 * 1000);
app.set('trust proxy', 1) // trust first proxy
app.use(cookieSession({
  secret: 'anystringoftext',
  name: 'session',
  keys: ['key1', 'key2'],
  cookie: {
    secure: true,
    httpOnly: true,
    expires: expiryday
  }
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

//Client
app.get('/', indexController)
app.get('/post', postController)


// Admin
app.get('/admin/database', authMiddleware, storePostController)

app.get('/admin/database/post', authMiddleware, newPostController)

app.get('/admin/database/edit/:id', authMiddleware, editPostController)

app.post('/admin/database/delete/:id', authMiddleware, deletePostController)

app.post('/admin/database/post/process', authMiddleware, newPostProcessController)

app.put('/admin/database/edited/:id', authMiddleware, putEditPostController)

app.get('/admin/register', redirectIfAuthenticatedMiddleware, registerPostController)

app.post('/admin/users/register', redirectIfAuthenticatedMiddleware, storeAdminPostController)

app.get('/admin', redirectIfAuthenticatedMiddleware, loginAdminController)

app.post('/admin/users/login', redirectIfAuthenticatedMiddleware, loginAdminProcessController)

app.get('/admin/logout', logoutController)

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
app.listen(port, () => {
  console.log('App listening...')
})
