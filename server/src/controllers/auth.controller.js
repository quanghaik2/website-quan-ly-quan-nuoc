const models = require('../models')
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)

class AuthController {
   login = async (req, res, next) => {
      try {
         const { username, password } = req.body

         if (!username || !password)
            throw new Error({
               statusCode: 400,
               message: 'Missing required fields',
            })
         
         const user = await models.user.findOne({ username: username})
         
         if (!user)
            throw new Error({
               statusCode: 404,
               message: 'Email or password is invalid',
            })

         if (!bcrypt.compareSync(password, user.password))
            throw new Error('Email or password is invalid')

         return res.status(200).json(user)
      } catch (error) {
         next(error)
      }
   }

   register = async (req, res, next) => {
      try {
         const { username, password, role } = req.body
         if (!username || !password)
            throw new Error({
               statusCode: 400,
               message: 'Missing required fields',
            })
         const hashPassword = bcrypt.hashSync(password, salt)

         const newUser = models.user.create({
            username,
            password: hashPassword,
            role,
         })

         return res.status(201).json(newUser)
      } catch (error) {
         next(error)
      }
   }
}

module.exports = new AuthController()
