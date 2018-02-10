const SERVER_PORT = process.env.PORT || 8080;
const customers = require('./public/data/customers.json');
const invoices = require('./public/data/invoices.json');
const reservations = require('./public/data/reservations.json');
const express = require("express");
const exphbs = require("express-handlebars");
const bodyparser = require("body-parser");
const apiRouter = require("./api");
const path = require('path');
// const services = require('./public/data/services.json');
const fs = require('fs');
const formidable = require('express-formidable');
const routes = require('./routes');




const app = express();
const router = express.Router();

app.engine(
  "hbs",
  exphbs({
    defaultLayout: "main",
    extname: "hbs"
  })
);
app.set("view engine", "hbs");

app.use(express.static("public"));
app.use(express.static("assets"));
app.use(formidable());
app.use(bodyparser.json()); // support json encoded bodies

app.use("/api", apiRouter);

// handle HTTP POST requests


// home page
app.get("/", routes.home);
app.get('/room/:id', routes.roomId);

app.get('/login', routes.invoiceQuery);

app.post('/invoice', routes.customerInvoice)

// form => --> To add new service; --> not public
app.get('/get-info', routes.getInfo);
// Send input to services.json
app.post('/post-services', routes.createInfo);




app.listen( SERVER_PORT, () => {
  console.info(`Server started at http://localhost:${SERVER_PORT}`);
});