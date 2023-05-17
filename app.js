const express = require('express');
const app = express();
app.use(express.json());

const tourRoute = require('./routes/tourRoutes');
const userRoute = require('./routes/userRoutes');

//key-word :route mounting gpt
app.use('/api/v1/tour', tourRoute);
app.use('/api/v1/user', userRoute);

app.listen(3000, () => {
  console.log('Server is running');
});
