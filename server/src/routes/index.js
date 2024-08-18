const routes = (app) => {
   app.use('/api/ingredient', require('./ingredient'));
   app.use('/api/statistics', require('./statistics'));
   app.use('/api/auth', require('./auth'));
   app.use('/api/table', require('./table'));
   app.use('/api/product', require('./product'));
   app.use('/api/order', require('./order'));
   app.use('/', (req, res) => {
      res.json('OK');
   });
};

module.exports = routes;
