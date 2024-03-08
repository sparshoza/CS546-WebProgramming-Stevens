import venuesRoutes from './venues.js';

const constructorMethod = (app) => {
  app.use('/', venuesRoutes);
  app.use('*', (req, res) => {
    res.sendStatus(404)
  });
};

export default constructorMethod;
//https://github.com/stevens-cs546-cs554/CS-546/blob/master/lecture_08/HTML_Templating/routes/index.js