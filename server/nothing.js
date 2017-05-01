'use strict'

module.exports = require('express').Router()
  .get('/',
    (req, res, next) => {
      console.log(req)
      res.send(req.session)
    }
  )
