var services = require('../public/data/services.json');
const fs = require('fs');
const express = require("express");
const invoices = require('../public/data/invoices.json');
const customers = require('../public/data/customers.json');
const reservations = require('../public/data/reservations.json');
const bodyparser = require("body-parser");
let formidable = require('express-formidable');

const app = express();
app.use(bodyparser.json());
app.use(formidable());

exports.home = function (req, res, next) {
  res.render("home", {
    services: services,
    title: 'Discover'
  });
};

exports.getInfo = (req, res) => {
  res.render('formData');
};

exports.roomId = (req, res) => {
  var room = services.filter(room => room.id === parseInt(req.params.id));
  res.render("room", {
    room: room,
    title: 'Discover'
  });
}

exports.createInfo = (req, res) => {
  if (req.fields.image === "" && req.fields.id === "" && req.fields['type of room'] === "" && req.fields.description === "" && req.fields.price === "") {
    res.redirect('/get-info');

  } else {
    // Add input to services.json
    let input = {
      image: req.fields.image,
      id: Number(req.fields.id),
      'type of room': req.fields['type of room'],
      description: req.fields.description,
      price: Number(req.fields.price)
    }
    services.push(input);

    // save new input to service.json
    fs.writeFile(__dirname + '/public/data/services.json', JSON.stringify(services, null, 2), err => {
      if (err) {
        console.log(err)
      }
    })
    res.redirect('/get-info');
  }
}

var img = "https://www.crownhotels.com.au/d/crown-metropol-melbourne/media/images_Metropol/CM_FUNC_ROOM_STU_01.jpg";
exports.invoiceQuery = (req, res) => {
  res.render('invoiceQuery', {
    title: 'Discover',
    image: img
  })
}

exports.customerInvoice = (req, res) => {
  const input = req.fields.email;
  const customer = customers.filter(customer => customer.email === input);
  console.log(customer);
  const reservation = reservations.filter(reservation => customer[0].id === reservation.customerId);
  console.log(reservation);
  const invoice = invoices.filter(invoice => invoice.reservationId === reservation[0].id);
  console.log(invoice);
  var balance = 0.00;
  if (invoice[0].paid) {
    balance = 0.00
  } else {
    balance = 'You have not paid';
  }
  res.render('customerInvoice', {
    invoice: invoice,
    customer: customer,
    title: 'Discover'
  })
}