const express = require('express');
const router = express.Router();
const axios = require('axios');
const xml2js = require('xml2js');
const getRoutes_Collection =  require('../../../models/OnlineAPIsManipulationModels/getRoutes_Model');





require('dotenv').config();

const apiUrl = process.env.API_URL;






async function compareDates(dateString) {
  const inputDate = new Date(dateString);

  const currentDate = new Date();

  if (inputDate < currentDate) {
    console.log("The input date is in the past.");


    try {
      const response = await axios.post("http://localhost:3010/api/authentication_tokenGenerator_API/Authenticating_TokenGenerating");
      console.log("Response from authentication API:", response.data);
  

    } catch (error) {
      console.error("Error updating API Settings:", error);
    }







  } else if (inputDate > currentDate) {
    console.log("The input date is in the future.");
    console.log("Token to be used")
    console.log(process.env.TOKEN)
  } else {
    console.log("The input date is the same as the current date.");
  }
}






router.post('/getRoutes', async (req, res) => {
    try { const {  AgentAccountNumber, TimeStamp, TransactionId, User, LanguagePrefCode, Currency, CountryCode, OriginatingSystem} = req.body;

    let tokenExpiringDate = process.env.TOKEN_EXPIRING_DATE;

    let TOKEN_to_USE = process.env.TOKEN;


    console.log(">>>>>>>>>>>>>")
    compareDates(tokenExpiringDate)
    console.log(">>>>>>>>>>>>>")




    console.log("--AgentAccountNumber")
    console.log(AgentAccountNumber)
    console.log("--TimeStamp")
    console.log(TimeStamp)
    console.log("--TransactionId")
    console.log(TransactionId)



      // Préparatino de la requête body XML
      const xmlRequestBody = `<?xml version="1.0" encoding="utf-8"?>
        <GetRoutesRequest xmlns="http://schemas.ferrygateway.org/1.2.1">
          <Context AgentAccountNumber="${AgentAccountNumber}" TimeStamp="${TimeStamp}" 
          TransactionId="${TransactionId}" User="${User}" 
          LanguagePrefCode="${LanguagePrefCode}" Currency="${Currency}" CountryCode="${CountryCode}" 
          OriginatingSystem="${OriginatingSystem}"/>
        </GetRoutesRequest>`;
  
      // Make the API call to get routes
      const response = await axios.post(apiUrl + '/fgw/infos/getRoutes', xmlRequestBody, {
        headers: {
          'Content-Type': 'application/xml',
          'Accept': 'application/xml',
          'Authorization': `bearer ${TOKEN_to_USE}`
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
  


// Post request qui crée many routes dans la base de données 
router.post("/insertRoutes", async (req, res) => {
  try {
    const routesArray = req.body; 
    const insertedRoutes = await getRoutes_Collection.insertMany(routesArray);
    res.status(201).json(insertedRoutes);
  } catch (error) {
    res.status(500).json({ message: "Error inserting routes", error: error.message });
  }
});

// 
router.get("/getRoutesListDB", async (req, res) => {
  try {
    // Query the database to get the list of routes
    const routesList = await getRoutes_Collection.find();

    // Return the list of routes as the response
    res.status(200).json(routesList);
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: "Error retrieving routes", error: error.message });
  }
});





  module.exports = router;
  