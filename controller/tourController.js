const fs = require('fs');
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

const checkData = (req, resp, next) => {
  if (req.body.name == null || req.body.place == null) {
    return resp.status(404).json({ status: 'failed', message: 'invalid data' });
  }
  next();
};
const getAllTour = (req, resp) => {
  resp.status(200).json({
    status: 'success',
    date: Date.now(),
    data: {
      tours,
    },
  });
};

const getTour = (req, resp) => {
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
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
  );

  const id = tours[tours.length - 1].id + 1;
  tours.push({ id, ...req.body });

  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
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

module.exports = {
  getAllTour,
  getTour,
  updateTourById,
  deleteTourById,
  addNewTour,
  checkData,
};
