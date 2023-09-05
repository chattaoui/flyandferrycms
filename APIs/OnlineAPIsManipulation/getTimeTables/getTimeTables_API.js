const express = require('express');
const router = express.Router();
const axios = require('axios');
const xml2js = require('xml2js');

const getTimeTables_Collection =  require('../../../models/OnlineAPIsManipulationModels/getTimeTables_Model');


require('dotenv').config();

const apiUrl = process.env.API_URL;

router.post('/getTimeTables', async (req, res) => {
  try {
    const { token, AgentAccountNumber, TimeStamp, TransactionId, User, LanguagePrefCode, Currency, CountryCode, OriginatingSystem, FromSailingDate, ToSailingDate, DepartPort, DestinationPort } = req.body;

    console.log("--Token")
    console.log(token);
    console.log("--AgentAccountNumber")
    console.log(AgentAccountNumber);
    console.log("--TimeStamp")
    console.log(TimeStamp);
    console.log("--TransactionId")
    console.log(TransactionId);

    // Prepare the XML request body
    const xmlRequestBody = `<?xml version="1.0" encoding="utf-8"?>
      <GetTimeTablesRequest xmlns="http://schemas.ferrygateway.org/1.2.1" 
      DepartPort="${DepartPort}" DestinationPort="${DestinationPort}" FromSailingDate="${FromSailingDate}" 
      ToSailingDate="${ToSailingDate}" OperatorCode="">
        <Context AgentAccountNumber="${AgentAccountNumber}" TimeStamp="${TimeStamp}" 
        TransactionId="${TransactionId}" User="${User}" 
        LanguagePrefCode="${LanguagePrefCode}" Currency="${Currency}" CountryCode="${CountryCode}" 
        OriginatingSystem="${OriginatingSystem}"/>
      </GetTimeTablesRequest>`;

    // Make the API call to get time tables
    const response = await axios.post(apiUrl + '/fgw/infos/getTimeTables', xmlRequestBody, {
      headers: {
        'Content-Type': 'application/xml',
        'Accept': 'application/xml',
        'Authorization': `bearer ${token}`
      }
    });

    // Convert XML response to JSON
    xml2js.parseString(response.data, (err, result) => {
      if (err) {
        console.error('XML to JSON Conversion Error:', err);
        res.status(500).send('An error occurred');
      } else {
        res.json(result);
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
});





// Post request qui crée many timeTables dans la base de données 
router.post("/insertTimeTables", async (req, res) => {
  try {
    const TimeTablesArray = req.body; 
    const insertedTimeTables = await getTimeTables_Collection.insertMany(TimeTablesArray);
    res.status(201).json(insertedTimeTables);
  } catch (error) {
    res.status(500).json({ message: "Error inserting routes", error: error.message });
  }
});


// 
router.get("/getTimeTablesListDB", async (req, res) => {
  try {
    // Query the database to get the list of routes
    const timeTablesList = await getTimeTables_Collection.find();

    // Return the list of routes as the response
    res.status(200).json(timeTablesList);
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: "Error retrieving routes", error: error.message });
  }
});







module.exports = router;
