const express = require("express");
const router = express.Router();
const axios = require("axios");
const xml2js = require("xml2js");


const getSailings_Collection =  require('../../../models/OnlineAPIsManipulationModels/getSailings_Model');



require("dotenv").config();

const apiUrl = process.env.API_URL;

router.post("/getSailings", async (req, res) => {
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
      departDateTimeOut,
      departPlaceOut,
      destinationPlaceOut,
      departDateTimeRtn,
      departPlaceRtn,
      destinationPlaceRtn,
      passengers,
      vehicles,
    } = req.body;

    // Preparation des passengers XML
    const passengersXML = passengers
      .map((passenger, index) => {
        return `<Passenger Id="${index + 1}" Age="${passenger.Age}" Category="${
          passenger.Category
        }" />`;
      })
      .join("");

    // Preparation des vehicles XML
    let vehiclesXML ="";
    if(vehicles){
    vehiclesXML = vehicles
      .map((vehicle, index) => {
        return `<Vehicle Id="${index + 1}">
                  <Lead OperatorCode="${vehicle.OperatorCode}" Height="${
          vehicle.Height
        }" Length="${vehicle.Length}" />
                </Vehicle>`;
      })
      .join("");
    }

    let rtnSailingXML = ''; 
    if (destinationPlaceRtn && departPlaceRtn && departDateTimeRtn) {
      rtnSailingXML = `
        <Sailing Id="Rtn">
          <SailingSearchCriterion DepartDateTime="${departDateTimeRtn}" DepartPlace="${departPlaceRtn}" DestinationPlace="${destinationPlaceRtn}" OperatorCode="" />
          <FareDetails FareType="" Productcode="" />
        </Sailing>`;
    }
    
    // Prepare the XML request body
    const xmlRequestBody = `<?xml version="1.0" encoding="utf-8"?>
      <GetSailingsRequest xmlns="http://schemas.ferrygateway.org/1.2.1" ShowAlternativeRoutes="true">
        <Context AgentAccountNumber="${AgentAccountNumber}" TimeStamp="${TimeStamp}" TransactionId="${TransactionId}" User="${User}" LanguagePrefCode="${LanguagePrefCode}" Currency="${Currency}" CountryCode="${CountryCode}" OriginatingSystem="${OriginatingSystem}" />
        <Passengers>
          ${passengersXML}
        </Passengers>
        <Vehicles>
          ${vehiclesXML}
        </Vehicles>
        <FerryComponent>
          <Sailings>
            <Sailing Id="Out">
              <SailingSearchCriterion DepartDateTime="${departDateTimeOut}" DepartPlace="${departPlaceOut}" DestinationPlace="${destinationPlaceOut}" OperatorCode="" />
              <FareDetails FareType="" Productcode="" />
            </Sailing>
            ${rtnSailingXML} 
          </Sailings>
        </FerryComponent>
      </GetSailingsRequest>`;

                console.log(">->->->>->>-><-><- The xml body request ");
                console.log(xmlRequestBody);

    // Make the API call to get time tables
    const response = await axios.post(
      apiUrl + "/fgw/offers/getSailings",
      xmlRequestBody,
      {
        headers: {
          "Content-Type": "application/xml",
          "Accept": "application/json",
          "Authorization": `bearer ${token}`,
        },
      }
    );



    res.send(response.data);







// -------> Le code ci-dessous est le qui fait les opérations de nettoyage de données que j'ai faites dans le front, après
// on aura le choix entre travailller avec ce code c'est à dire faire le nettoyage nécessaire du data et l'envoyer prêt
// à être utilisé dans le frontend ou travailler avec le response de l'api hogia et faire le traitement de nettoyage dans
// le frontend

    // const sailingsArray = response.data.GetSailingsResponse.FerryComponents.FerryComponent.Sailings.Sailing;
    // const costsArray = response.data.GetSailingsResponse.FerryComponents.FerryComponent.Cost.CostDetails;
    
    // const transformedSailings = sailingsArray.map(sailing => {
    //     const { SailingInfo, Ship, FareDetails, Services } = sailing;
    //     const sailingId = sailing['@Id'];
    
    //     const costElement = costsArray.find(cost => cost['@SailingId'] === sailingId);
    
    //     const totalAccommodationCost = parseFloat(costElement.CostDetail[0]['@TotalAmount']);
    //     const totalPassengerCost = parseFloat(costElement.CostDetail[1]['@TotalAmount']);
    //     const totalGrossAmount = parseFloat(costElement['@GrossAmount']);
    
    //     return {
    //         DepartPort: SailingInfo['@DepartPort'],
    //         DestinationPort: SailingInfo['@DestinationPort'],
    //         ArriveDateTime: SailingInfo['@ArriveDateTime'],
    //         DepartDateTime: SailingInfo['@DepartDateTime'],
    //         shipName: Ship['@ShipName'],
    //         FareType: FareDetails['@FareType'],
    //         OnBoardAccommodationServicesCode: Services.OnBoardAccommodationServices.OnBoardAccommodationService['@Code'],

    //         id: sailingId,
    //         GrossAmount: totalGrossAmount,
    //         TotalAccommodationCost: totalAccommodationCost,
    //     };
    // });
    
    // const dataToSendToFrontend = {
    //     timeStamp: TimeStamp,
    //     sailings: transformedSailings
    // };
    
    // res.status(200).json(dataToSendToFrontend);



  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred");
  }
});







//Post request qui crée plusieurs éléments sailings dans la base de données
router.post('/insertManySailings_DB', async (req, res) => {
  try {
    const sailingsDataArray = req.body; 
    
    const insertedData = await getSailings_Collection.insertMany(sailingsDataArray);
    
    res.json({ message: 'sailingsDataArray Data inserted successfully', insertedData });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});





// GET request to retrieve all sailings from the database
router.get("/getAllSailings_DB", async (req, res) => {
  try {
    const allSailings = await getSailings_Collection.find();
    res.status(200).json(allSailings);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred");
  }
});





module.exports = router;
