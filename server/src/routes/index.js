const routes = (app) => {
   app.use('/api/auth', require('./auth'))
   app.use('/', (req, res) => {
      res.json('OK')
   })
}

module.exports = routes
