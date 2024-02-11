const express = require("express");
const http = require('http');

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

const CapitalOneAPIKEY = process.env.C_ONE_API_KEY;

// This section will help you get a list of all the records.
recordRoutes.route("/my_causes").post(async function (req, res) {
  let db_connect = dbo.getDb("neighborhood_fund");

  let accounts = await db_connect.collection("accounts")
  .find().toArray();

  accounts = accounts.filter((acc) => {
    return acc.account_id == req.body.account_id});

    if (accounts === undefined || accounts.length == 0) {
    res.json({});
  } else {
    const account = accounts[0];
  
    const elems = await db_connect
      .collection("causes")
      .find({}).toArray();
  
    const result = elems.filter((elem) => {
      return  account.communities.includes(elem.community_name);
    }); 

    console.log(result);
  
    res.json(result);
  }

});

recordRoutes.route("/browse_causes").post(async function (req, res) {
  let db_connect = dbo.getDb("neighborhood_fund");

  const elems = await db_connect
    .collection("causes")
    .find({}).toArray();

  res.json(elems);
});

// This section will help you get a single record by id
recordRoutes.route("/record/:id").get(async function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: new ObjectId(req.params.id) };
  const elem = await db_connect
    .collection("records")
    .findOne(myquery);

  res.json(elem);
});

let create_withdrawl = (account_id, amount) => {
  let urlparams = {
    host: 'api.nessieisreal.com',
    port: 80,
    path: '/accounts/'+account_id+'/withdrawals?key='+CapitalOneAPIKEY,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    }
  };

  function OnResponse(response) {
    var data = '';

    response.on('data', function(chunk) {
        data += chunk; //Append each chunk of data received to this variable.
    });
    response.on('end', function() {
        console.log(data); //Display the server's response, if any.
    });
  }

  let request = http.request(urlparams, OnResponse);
  let requestBody = {
    "medium": "balance",
    "transaction_date": "2024-02-11",
    "status": "completed",
    "amount": amount,
    "description": "Neighborhood-Fund"
  }
  request.write(JSON.stringify(requestBody)); //Send off the request.
  request.end(); //End the request.
}

// This section will help you create a new record.
recordRoutes.route("/create_cause").post(async function (req, response) {
  let db_connect = dbo.getDb("neighborhood_fund");
  let myobj = {
    name: req.body.name,
    description: req.body.description,
    community_name: req.body.community_name,
    donation_needed: parseInt(req.body.donation_needed),
    donation_received: 0,
    status: "approved"
  };
  console.log(myobj);
  const res = await db_connect.collection("causes").insertOne(myobj);
  console.log(res);
  response.json(res);
});

recordRoutes.route("/donate").post(async function (req, response) {
  let db_connect = dbo.getDb("neighborhood_fund");
  
  let myquery = { _id: new ObjectId(req.body._id) };
  
  console.log(req.body);
  
  let accounts = await db_connect.collection("accounts")
  .find().toArray();

  accounts = accounts.filter((acc) => acc.account_id == req.body.account_id);

  if (accounts === undefined || accounts.length == 0) {
    res.json({});
    return;
  } 
  
  const account = accounts[0];

  create_withdrawl(account.bank_account_id, req.body.new_donation);

  let newvalues = {
    $set: {
      donation_received: req.body.donation_received + req.body.new_donation
    },
  };
  const res = await db_connect
    .collection("causes")
    .updateOne(myquery, newvalues);

  console.log(res);
  response.json(res);
});

// This section will help you update a record by id.
recordRoutes.route("/update/:id").post(async function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: new ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      name: req.body.name,
      position: req.body.position,
      level: req.body.level,
    },
  };
  const res = await db_connect
    .collection("records")
    .updateOne(myquery, newvalues);

  response.json(res);
});

// This section will help you delete a record
recordRoutes.route("/:id").delete(async (req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: new ObjectId(req.params.id) };
  const res = await db_connect.collection("records").deleteOne(myquery);
  response.json(res);
});

module.exports = recordRoutes;
