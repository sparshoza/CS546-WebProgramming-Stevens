import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import session from 'express-session';
import exphbs from 'express-handlebars';
import configRoutes from './routes/index.js';
import { config } from 'process';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const staticDir = express.static(__dirname + '/public');

app.use(session({
  name: 'AuthCookie',
  secret: 'some secret string!',
  resave: false,
  saveUninitialized: true,
}));

app.use('/public', staticDir);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use((req, res, next) => {
  console.log(`[${new Date().toUTCString()}]: ${req.method} ${req.originalUrl} (${req.session.user ? 'Authenticated User' : 'Non-Authenticated User'})`);
  next();
});

app.use('/', (req,res,next) =>{
  const { user } = req.session;
  if (!user) {
    return res.redirect('/login');
  }

  if (user.role === 'admin') {
    return res.redirect('/admin');
  }

  if (user.role === 'user') {
    return res.redirect('/protected');
  }
  next();
});

app.use('/login', (req, res, next) => {
  const { user } = req.session;

  if (user.role === 'admin') {
    return res.redirect('/admin');
  }

  if (user.role === 'user') {
    return res.redirect('/protected');
  }
});

app.use('/register', (req, res, next) => {
  const { user } = req.session;

  if (user && user.role === 'admin') {
    return res.redirect('/admin');
  }

  if (user && user.role === 'user') {
    return res.redirect('/protected');
  }

  next();
});

app.use('/protected', (req, res, next) => {
  next();
});

app.use('/admin', (req, res, next) => {
  const { user } = req.session;

  if (user.role !== 'admin') {
    return res.status(403).render('error', { message: 'You do not have permission to view this page.' });
  }

  next();
});

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});
