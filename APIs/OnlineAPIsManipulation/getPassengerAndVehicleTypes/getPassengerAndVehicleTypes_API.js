const express = require('express');
const router = express.Router();
const axios = require('axios');
const xml2js = require('xml2js');
const getRoutes_Collection =  require('../../../models/OnlineAPIsManipulationModels/getRoutes_Model');

const LeadVehicles =  require('../../../models/OnlineAPIsManipulationModels/leadVehicles_Model');
const TrailerVehicles =  require('../../../models/OnlineAPIsManipulationModels/trailerVehicles_Model');

const Passenger =  require('../../../models/OnlineAPIsManipulationModels/passengerCategory_Model');




require('dotenv').config();

const apiUrl = process.env.API_URL;


router.post('/getPassengerAndVehicleTypes', async (req, res) => {
    try { const { token, AgentAccountNumber, TimeStamp, TransactionId, User, LanguagePrefCode, Currency, CountryCode, OriginatingSystem} = req.body;


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
        <GetPassengerAndVehicleTypesRequest xmlns="http://schemas.ferrygateway.org/1.2.1">
          <Context AgentAccountNumber="${AgentAccountNumber}" TimeStamp="${TimeStamp}" 
          TransactionId="${TransactionId}" User="${User}" 
          LanguagePrefCode="${LanguagePrefCode}" Currency="${Currency}" CountryCode="${CountryCode}" 
          OriginatingSystem="${OriginatingSystem}"/>
        </GetPassengerAndVehicleTypesRequest>`;
  


        console.log(">>>>>>>>>> The xmlRequestBody ")
        console.log(xmlRequestBody)


      // Make the API call to get routes
      const response = await axios.post(apiUrl + '/fgw/infos/getPassengerAndVehicleTypes', xmlRequestBody, {
        headers: {
          'Content-Type': 'application/xml',
          'Accept': 'application/json',
          'Authorization': `bearer ${token}`
        }
      });
  
     res.send(response.data)


    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred');
    }
  });
  


  router.get("/All_leadVehicles_DB", async (req, res) => {
    try {
      const allLeadVehicles = await LeadVehicles.find();
      res.status(200).json(allLeadVehicles);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });
  

  router.post("/insertManyLeadVhehicles", async (req, res) => {
    try {
      const leadVehiclesArray = req.body; 
      const savedLeadVehicles = await LeadVehicles.insertMany(leadVehiclesArray);
      res.status(201).json(savedLeadVehicles);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });








  router.get("/All_TrailerVehicles_DB", async (req, res) => {
    try {
      const allTrailerVehicles = await TrailerVehicles.find();
      res.status(200).json(allTrailerVehicles);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });
  

  router.post("/insertManyTrailerVhehicles", async (req, res) => {
    try {
      const TrailerVehiclesArray = req.body; 
      const savedTrailerVehicles = await TrailerVehicles.insertMany(TrailerVehiclesArray);
      res.status(201).json(savedTrailerVehicles);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });






  router.get("/All_passengers_DB", async (req, res) => {
    try {
      const allPassengers = await Passenger.find();
      res.status(200).json(allPassengers);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
  router.post("/insertManyPassengers", async (req, res) => {
    try {
      const passengersArray = req.body;
      const savedPassengers = await Passenger.insertMany(passengersArray);
      res.status(201).json(savedPassengers);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });























  module.exports = router;
  