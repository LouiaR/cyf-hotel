const express = require("express");
const router = express.Router();
const services = require('../public/data/services.json');

router.get('/:id?', (req, res) => {
    if (req.params.id){
      res.status(200).json({
       services: services.filter(service => service.id === parseInt(req.params.id))
      });
    }else {
      res.status(200).json({
        services
      });
    }
  });

  module.exports = router;
