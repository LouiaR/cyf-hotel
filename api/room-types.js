const express = require("express");
const router = express.Router();

router.get("/services", (req, res) => {
  // TODO return DB row here
  res.status(200).json({
    roomtypes: [
      {
        id: 2,
        name: "premium",
        standard_price: 60,
        current_price: 50
      }
    ]
  });
});


module.exports = router;
