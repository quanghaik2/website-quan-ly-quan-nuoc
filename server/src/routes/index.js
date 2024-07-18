const routes = (app) => {
   app.use('/', (req, res) => {
      res.json('OK')
   })
}

module.exports = routes
