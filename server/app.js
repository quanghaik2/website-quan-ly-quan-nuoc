const express = require('express')
const app = express()
const morgan = require('morgan')
const compression = require('compression')
const cookieParser = require('cookie-parser')
const cors = require('cors')
require('dotenv').config()

// init middlewares
app.use(morgan('dev')) // morgan('combined') full thong tin
// app.use(helmet()); // bao ve thong tin rieng tu, ngan chan web thu 3 truy cap doc thong tin, cookie
app.use(compression()) // giam dung luong van chuyen du lieu web
let whiteList = [
   'http://localhost:3000',
   `${process.env.URL_FRONTEND}`,
   'https://chia-se-sach.vercel.app',
]
app.use(
   cors({
      origin: whiteList,
      credentials: true,
      allowedHeaders: [
         'Authorization',
         'Content-Type',
         'Access-Control-Request-Method',
         'X-Requested-With',
         'Accept',
         'Access-Control-Request-Headers',
         'Origin',
         'Access-Control-Allow-Headers',
      ],
      methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'],
      exposedHeaders: ['Access-Control-Allow-Origin', 'x-auth-token'],
      preflightContinue: true,
   })
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// init db
require('./src/configs/init.mongodb')

// init routes
require('./src/routes/index')(app)

// handling error
app.use((req, res, next) => {
   const error = new Error('Not Found')
   error.statusCode = 404
   next(error)
})
app.use((error, req, res, next) => {
   const status = error.statusCode || 500
   return res.status(status).json({
      status: 'error',
      code: status,
      message: error.message || 'Internal Server Error',
      stack: process.env.NODE_ENV === 'development' ? error.stack : '',
   })
})

app.listen(process.env.PORT, () => {
   console.log(`Server is running on port ${process.env.PORT}`)
})














//"socket.io": "^4.7.5",