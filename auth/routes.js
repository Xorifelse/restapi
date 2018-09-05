const {Router} = require('express')
const {toJWT, toData} = require('./jwt')

const router = new Router()

router.get('/login', (req, res, next) => {
  res.status(400).send()
})

router.get('/secret-endpoint', (req, res) => {
  const auth = req.headers.authorization && req.headers.authorization.split(' ')
  if (auth && auth[0] === 'Bearer' && auth[1]) {
    try {
      const data = toData(auth[1])
      res.send({
        message: 'Thanks for visiting the secret endpoint.',
        data
      })
    }
    catch(error) {
      res.status(400).send({
        message: `Error ${error.name}: ${error.message}`,
      })
    }
  }
  else {
    res.status(401).send({
      message: 'Please supply some valid credentials'
    })
  }
})

router.post('/login', (req, res, next) => {
  if('username' in req.body && 'password' in req.body){
    res.send({
      jwt: toJWT({ userId: 1 })
    })
  } else {
    res.status(400).send({
      message: 'Please supply a valid email and password'
    })
  }
})

module.exports = router