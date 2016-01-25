var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var $fh = require('fh-mbaas-api');

function databaseRoute() {
  var db = new express.Router();
  db.use(cors());
  db.use(bodyParser());


  // POST ADD REST endpoint
  db.post('/add', function(req, res) {
    console.log(req.body);

    // Create a single entry/row
    var options = {
      "act": "create",
      "type": "employees",
      "fields": req.body
    };

    $fh.db(options, function(err, data) {
      if (err) {
        console.log(err);
        res.status(500);
        res.json({
          msg: "Failed to save"
        });
      } else {
        res.json({
          msg: "Data saved"
        });
      }
    });
  });

  return db;
}

module.exports = databaseRoute;