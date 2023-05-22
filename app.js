const express = require('express');
const app = express();
app.use(express.json());

const tourRoute = require('./routes/tourRoutes');
const userRoute = require('./routes/userRoutes');

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
