const {Router} = require('express')
const Company = require('./model')

const router = new Router()

router.get('/companies', (req, res, next) => {
  Company
    .findAll()
    .then(companies => {
      res.send({ companies })
    })
    .catch(error => next(error))
})

router.get('/companies/:id', (req, res, next) => {
  Company
    .findById(req.params.id, { include: [Company] })
    .then(Company => {
      if (!Company) res.status(404).send({
        message: `Company does not exist`
      })
      res.send(Company)
    })
    .catch(error => next(error))
})

router.post('/companies', (req, res, next) => {
  Company
    .create(req.body)
    .then(Company => {
      if (!Company) res.status(404).send({
        message: `Company does not exist`
      })
      res.status(201).send(Company)
    })
    .catch(error => next(error))
})

router.put('/companies/:id', (req, res, next) => {
  Company
    .findById(req.params.id)
    .then(Company => {
      if (!Company) res.status(404).send({
        message: `Company does not exist`
      })
      
      return Company.update(req.body)
    })
    .then(Company => res.send(Company))
    .catch(error => next(error))
})

router.delete('/companies/:id', (req, res, next) => {
  Company
    .findById(req.params.id)
    .then(Company => {
      if (!Company) res.status(404).send({
        message: `Company does not exist`
      })
      
      return Company.destroy()
    })
    .then(() => res.send({
      message: `Company was deleted`
    }))
    .catch(error => next(error))
})

module.exports = router