

const express = require("express");
const router = express.Router();
const axios = require("axios");
const xml2js = require("xml2js");

require("dotenv").config();

const apiUrl = process.env.API_URL;

router.post("/getPrice", async (req, res) => {
    try {
      const {
        token,
        AgentAccountNumber,
        TimeStamp,
        TransactionId,
        User,
        LanguagePrefCode,
        Currency,
        CountryCode,
        OriginatingSystem,
        passengers,
        vehicles,
        sailings,
        onBoardAccomodationServices,
        OnBoardServices

      } = req.body;
  
      // Prepare the XML request body

      //The passengers Part
      
      let passengersXML="";
       passengersXML = passengers
        .map((passenger, index) => {
          return `<Passenger Id="${index + 1}" Age="${passenger.Age}" Category="${passenger.Category}" />`;
        })
        .join("");
  



        let vehiclesXML = "";

        // The vehicles Part
        if (vehicles) {
          vehiclesXML = vehicles
            .map((vehicle, index) => {
              return `<Vehicle Id="${index + 1}">
                        <Lead OperatorCode="${vehicle.OperatorCode}" Height="${vehicle.Height}" Length="${vehicle.Length}" />
                      </Vehicle>`;
            })
            .join("");
        }
        
        // The onBoardAccomodationServices XML Part
        let onBoardAccomodationServicesXML = "";
        if (onBoardAccomodationServices) {
          onBoardAccomodationServicesXML = onBoardAccomodationServices
            .map((onBoardAccomodationService, index) => {
              return `<OnBoardAccommodationService Code="${onBoardAccomodationService.Code}" Quantity="${onBoardAccomodationService.Quantity}" />`;
            })
            .join("");
        }
        
        // The OnBoardServices XML Part
        let OnBoardServicesXML = "";
        if (OnBoardServices) {
          OnBoardServicesXML = OnBoardServices
            .map((OnBoardService, index) => {
              return `<OnBoardService Code="${OnBoardService.Code}" Quantity="${OnBoardService.Quantity}" />`;
            })
            .join("");
        }
        





      //The sailings Part
      const sailingsXML = sailings
        .map((sailing, index) => {
          return `<Sailing Id="${sailing.id}" AllPassengers="true">
                    <SailingInfo DepartDateTime="${sailing.DepartDateTime}:00" DepartPort="${sailing.DepartPort}" DestinationPort="${sailing.DestinationPort}" />
                    <FareDetails FareType="${sailing.FareType}" Productcode="" />
                    <Services>
                      <OnBoardAccommodationServices>
                      ${onBoardAccomodationServicesXML}
                      </OnBoardAccommodationServices>


                      <OnBoardServices>
                      ${OnBoardServicesXML}
                      </OnBoardServices>


                    </Services>
                  </Sailing>`;
        })
        .join("");
  
      const xmlRequestBody = `<?xml version="1.0" encoding="utf-8"?>
        <GetPriceRequest xmlns="http://schemas.ferrygateway.org/1.2.1">
          <Context AgentAccountNumber="${AgentAccountNumber}" TimeStamp="${TimeStamp}" TransactionId="${TransactionId}" User="${User}" LanguagePrefCode="${LanguagePrefCode}" Currency="${Currency}" CountryCode="${CountryCode}" OriginatingSystem="${OriginatingSystem}" />
          <Passengers>
            ${passengersXML}
          </Passengers>
          <Vehicles>
            ${vehiclesXML}
          </Vehicles>
          <FerryComponent>
            <Sailings>
              ${sailingsXML}
            </Sailings>
          </FerryComponent>
        </GetPriceRequest>`;

        console.log("XML Request Body");
    console.log(xmlRequestBody)
      const response = await axios.post(apiUrl + "/fgw/offers/getPrice", xmlRequestBody, {
        headers: {
          "Content-Type": "application/xml",
          "Accept": "application/json",
          "Authorization": `bearer ${token}`,
        },
        
      });
      res.send(response.data);






    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred");
    }
  });




  module.exports = router;
