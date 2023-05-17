const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json());
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTour = (req, resp) => {
  resp.status(200).json({
    status: 'success',
    date: Date.now(),
    data: {
      tours,
    },
  });
};

const getTourById = (req, resp) => {
  console.log(req.params);
  resp.status(200).json({ req: req.params, date: Date.now() });
};

const updateTourById = (req, resp) => {
  resp.status(201).json({
    status: 'success',
    date: Date.now(),
    id: req.params.id,
    data: {
      tour: 'updated tour',
    },
  });
};
const deleteTourById = (req, resp) => {
  resp.status(400).json({
    status: 'success',
    date: Date.now(),
    id: req.params.id,
    data: null,
  });
};
const addNewTour = (req, resp) => {
  const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
  );

  const id = tours[tours.length - 1].id + 1;
  tours.push({ id, ...req.body });

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (error) => {
      if (error) throw new Error('Error: File not saved');

      resp.status(201).json({
        status: 'success',
        date: Date.now(),
        data: {
          tours: req.body,
        },
      });
    }
  );
};

// app.get('/api/v1/tour/:id', getTourById); //define the dynamic route
// app.get('/api/v1/tour', getAllTour);
// app.patch('/api/v1/tour/:id', updateTourById);
// app.delete('/api/v1/tour/:id', deleteTourById);
// app.post('/api/v1/tour', addNewTour);

app
  .route('/api/v1/tour/:id')
  .get(getTourById)
  .patch(updateTourById)
  .delete(deleteTourById);

app.route('/api/v1/tour').get(getAllTour).post(addNewTour);

app.listen(3000, () => {
  console.log('Server is running');
});
