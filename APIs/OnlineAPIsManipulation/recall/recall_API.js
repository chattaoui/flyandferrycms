const express = require('express');
const router = express.Router();
const axios = require('axios');
const xml2js = require('xml2js');





require('dotenv').config();

const apiUrl = process.env.API_URL;


router.post('/recall', async (req, res) => {
    try { const { token, AgentAccountNumber, TimeStamp, TransactionId, User, LanguagePrefCode, Currency, CountryCode, OriginatingSystem,referenceBooking} = req.body;


    console.log("--Token")
    console.log(token)
    console.log("--AgentAccountNumber")
    console.log(AgentAccountNumber)
    console.log("--TimeStamp")
    console.log(TimeStamp)
    console.log("--TransactionId")
    console.log(TransactionId)



      // Préparatino de la requête body XML
      const xmlRequestBody = `<?xml version="1.0" encoding="utf-8"?>
        <RecallBookingRequest xmlns="http://schemas.ferrygateway.org/1.2.1">
          <Context AgentAccountNumber="${AgentAccountNumber}" TimeStamp="${TimeStamp}" 
          TransactionId="${TransactionId}" User="${User}" 
          LanguagePrefCode="${LanguagePrefCode}" Currency="${Currency}" CountryCode="${CountryCode}" 
          OriginatingSystem="${OriginatingSystem}"/>
          <BookingReference Reference="${referenceBooking}" Version="1" />

        </RecallBookingRequest>`;
  
      // Make the API call to get routes
      const response = await axios.post(apiUrl + '/fgw/bookings/recall', xmlRequestBody, {
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
  






  module.exports = router;
  