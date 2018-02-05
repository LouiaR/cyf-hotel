const SERVER_PORT = process.env.PORT || 8080;
const customers = require('./public/data/customers.json');
const invoices = require('./public/data/invoices.json');
const express = require("express");
const exphbs = require("express-handlebars");
const bodyparser = require("body-parser");
const apiRouter = require("./api");
const path = require('path');
// const services = require('./public/data/services.json');
const fs = require('fs');
const formidable = require('express-formidable');
const routes = require('./routes');






// var source = document.getElementById('room-template').html;
// var template = Handlebars.compile(services);
// var html = template(data);
// document.getElementById('room-detail').html = html;

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
app.use(bodyparser.json());
// app.use(bodyparser.json()); // support json encoded bodies
//  app.use(bodyparser.urlencoded({ extended: false })); // support encoded bodies

app.use("/api", apiRouter);

// handle HTTP POST requests


// home page
app.get("/", routes.home);
app.get('/room/:id', routes.roomId);

// app.post('/invoice/login', routes.login)
// app.get('/invoice/login', routes.login);

// app.get('/invoice/login', (req, res) => {
//   res.render('invoiceForm');
// })
app.get('/login', routes.invoiceQuery);

app.post('/invoice', routes.customerInvoice)

// form => --> To add new service; --> not public
app.get('/get-info', routes.getInfo);
// Send input to services.json
app.post('/post-services', routes.createInfo);




app.listen( SERVER_PORT, () => {
  console.info(`Server started at http://localhost:${SERVER_PORT}`);
});