const express = require("express");
const router = express.Router();
const invoice = require('../public/data/invoices.json');

// router.post("/invoice", (req, res) => {
//   // TODO read req.body.reservation, look up price by room id and insert reservation into DB
//   res.status(200).json(req.body.invoice);
// });

router.get('/:id?', (req, res) => {
  if (req.params.id){
    res.status(200).json({
     invoice: invoice.filter(invoice => invoice.id === parseInt(req.params.id))
    });
  }else {
    res.status(200).json({
      invoice
    });
  }
});

// router.put("/invoice", (req, res) => {
//   // TODO read req.query.reservationId and req.body.invoice and insert into DB
//   res.status(200).json({
//     reservationId: req.query.reservationId,
//     invoice: req.body.invoice
//   });
// });

module.exports = router;
