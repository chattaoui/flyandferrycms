const express = require("express");
const router = express.Router();
const axios = require("axios");
const xml2js = require("xml2js");

const getServices_Collection =  require('../../../models/OnlineAPIsManipulationModels/getServices_Model');


require("dotenv").config();

const apiUrl = process.env.API_URL;

router.post("/getServices", async (req, res) => {
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
      } = req.body;
  
      // Prepare the XML request body

      //The passengers Part
      const passengersXML = passengers
        .map((passenger, index) => {
          return `<Passenger Id="${index + 1}" Age="${passenger.Age}" Category="${passenger.Category}" />`;
        })
        .join("");
  
        let vehiclesXML ="";

        //The vehicles Part
        if(vehicles){

            vehicles.map((vehicle, index) => {
          return `<Vehicle Id="${index + 1}">
                    <Lead OperatorCode="${vehicle.OperatorCode}" Height="${vehicle.Height}" Length="${vehicle.Length}" />
                  </Vehicle>`;
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
                        <OnBoardAccommodationService Code="${sailing.AccommodationCode}" Quantity="${sailing.AccommodationQuantity}" />
                      </OnBoardAccommodationServices>
                    </Services>
                  </Sailing>`;
        })
        .join("");
  
      const xmlRequestBody = `<?xml version="1.0" encoding="utf-8"?>
        <GetServicesRequest xmlns="http://schemas.ferrygateway.org/1.2.1">
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
        </GetServicesRequest>`;

        console.log("XML Request Body");
    console.log(xmlRequestBody)
      const response = await axios.post(apiUrl + "/fgw/offers/getServices", xmlRequestBody, {
        headers: {
          "Content-Type": "application/xml",
          "Accept": "application/json",
          "Authorization": `bearer ${token}`,
        },
      });


// console.log("The respone ")
// console.log(response)


      // returning the normal response that contains all the complex data
      // res.send(response.data);

      //returning all the necessary data from the response
      const service = response.data.GetServicesResponse.FerryComponents.FerryComponent.Sailings.Sailing;
      const sailingServicesInfos= {
        DepartPort: service.SailingInfo['@DepartPort'],
        DestinationPort: service.SailingInfo['@DestinationPort'],
        DepartDateTime: service.SailingInfo['@DepartDateTime'],
        ArriveDateTime: service.SailingInfo['@ArriveDateTime'],
        ShipName: service.Ship['@ShipName'],
        FareType: service.FareDetails['@FareType'],
        ServicesOptions: service.ServicesOptions
      };
      res.send(sailingServicesInfos);



    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred");
    }
  });




// inserting many services
  router.post("/insertManyServices", async (req, res) => {
    try {
      const ListofServices = req.body; 
      const savedServices = await getServices_Collection.insertMany(ListofServices);
      res.status(201).json(savedServices);
    } catch (error) {
      res.status(500).json({ message: "Error saving savedServices", error: error.message });
    }
  });
  
  

  // GET request to retrieve all services
router.get('/getAllServices', async (req, res) => {
  try {
    const allServices = await getServices_Collection.find();
    res.status(200).json(allServices);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving services', error: error.message });
  }
});

module.exports = router;
