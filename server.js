const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const cookieSession = require('cookie-session');
const cloudinary = require('cloudinary');

const globalErrorHandler = require('./controllers/error');
const connectDB = require('./config/db');
const AppError = require('./utils/appError');

require('./config/passportSetup');
require('dotenv').config({ path: './config.env' });

const app = express();
connectDB();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

app.use(
  cookieSession({
    name: 'session',
    secure: false,
    keys: [process.env.COOKIE_KEY],
    maxAge: 24 * 60 * 60 * 100,
  })
);

app.use(cookieParser());

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: 'POST,HEAD,PUT,PATCH,GET,DELETE',
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json({ extended: false }));

app.use('/api/imageUpload', require('./routes/image'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/emotes', require('./routes/emotes'));
app.use('/api/channels', require('./routes/channels'));
app.use('/api/feedback', require('./routes/feedback'));

app.all('/*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, function () {
  console.log('Server is running on the port:', PORT);
});
