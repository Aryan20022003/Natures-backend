const express = require('express');
const rateLimit = require('express-rate-limit');
const app = express();
const tourRoute = require('./routes/tourRoutes');
const userRoute = require('./routes/userRoutes');
const mongoSanitize = require('express-mongo-sanitize');
const { xss } = require('express-xss-sanitizer');
const hpp = require('hpp');
//http security header
const helmet = require('helmet');
app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests, please try again later.',
});
app.use(limiter);

//adding body.
app.use(express.json('10kb'));

//mongooes sanantization
app.use(mongoSanitize());

//xss sanitization cross site attack
app.use(xss());

//removing parameter pollution
app.use(hpp());

//key-word :route mounting gpt
app.use('/api/v1/tour', tourRoute);
app.use('/api/v1/user', userRoute);

app.all('*', (req, resp, next) => {
  const error = new Error('invalid route');
  error.status = 404;
  next(error);
});
//for error handling

app.use((error, req, resp, next) => {
  resp.status(error.status || 500).json({
    status: error.status || 500,
    error: error.message,
  });
});

module.exports = app;

// app.listen(3000, () => {
//   console.log('Server is running');
// });
