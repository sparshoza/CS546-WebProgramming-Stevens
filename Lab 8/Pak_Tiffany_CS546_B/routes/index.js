//Here you will import route files and export them as used in previous labs
import venuesRoutes from './venues.js';

const constructorMethod = (app) => {
  app.use('/', venuesRoutes);
  app.use('*', (req, res) => {
    res.sendStatus(404)
  });
};

export default constructorMethod;
