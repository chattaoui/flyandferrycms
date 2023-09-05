const express = require('express');
const router = express.Router();
const axios = require('axios');

const booking_Collection =  require('../../../models/OnlineAPIsManipulationModels/booking_Model');



require("dotenv").config();

const apiUrl = process.env.API_URL;



router.post("/book", async (req, res) => {
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
      contactDetails,
      onBoardAccommodationServices,
      onBoardServices
    } = req.body;

    // Prepare the XML request body
    const passengersXML = passengers
      .map((passenger, index) => {
        return `<Passenger Id="${index + 1}" Category="${passenger.Category}" Title="${passenger.Title}" Forename="${passenger.Forename}" Surname="${passenger.Surname}" DateOfBirth="${passenger.DateOfBirth}" Gender="${passenger.Gender}" IdentityCategory="${passenger.IdentityCategory}" IdentityNumber="${passenger.IdentityNumber}" IdentityIssueCountry="${passenger.IdentityIssueCountry}" IdentityExpiryDate="${passenger.IdentityExpiryDate}" PassengerNationality="${passenger.PassengerNationality}" />`;
      })
      .join("");

    const vehiclesXML = vehicles
      .map((vehicle, index) => {
        return `<Vehicle Id="${index + 1}">
                  <Lead OperatorCode="${vehicle.OperatorCode}" Height="${vehicle.Height}" Length="${vehicle.Length}" Registration="${vehicle.Registration}" />
                </Vehicle>`;
      })
      .join("");






const onBoardAccommodationServicesXML = onBoardAccommodationServices.map((onBoardAccommodationService) => {
    return `
      <OnBoardAccommodationService Code="${onBoardAccommodationService.code}" Quantity="${onBoardAccommodationService.quantity}">
        <PassengerRefs>
          ${onBoardAccommodationService.passengerRefs.map((ref) => `<Ref Id="${ref}" />`).join("\n")}
        </PassengerRefs>
      </OnBoardAccommodationService>
    `;
  }).join("\n");
  
  const onBoardServicesXML = onBoardServices.map((onBoardService) => {
    return `
      <OnBoardService Code="${onBoardService.code}" Quantity="${onBoardService.quantity}">
        <PassengerRefs>
          ${onBoardService.passengerRefs.map((ref) => `<Ref Id="${ref}" />`).join("\n")}
        </PassengerRefs>
      </OnBoardService>
    `;
  }).join("\n");












    const sailingsXML = sailings
      .map((sailing, index) => {
        return `<Sailing Id="${sailing.id}">
                  <SailingInfo DepartDateTime="${sailing.DepartDateTime}" DepartPort="${sailing.DepartPort}" DestinationPort="${sailing.DestinationPort}" AllPassengers="true" AllPets="true" AllVehicles="true" />
                  <FareDetails FareType="${sailing.FareType}" Productcode="" />
                 
                 
                  <Services>


                        <OnBoardAccommodationServices>
                        ${onBoardAccommodationServicesXML}
                        </OnBoardAccommodationServices>
                        
                        <OnBoardServices>
                        ${onBoardServicesXML}
                        </OnBoardServices>





                  </Services>
                </Sailing>`;
      })
      .join("");



      
    const contactDetailsXML = `
      <ContactDetails Forename="${contactDetails.Forename}" Surname="${contactDetails.Surname}" Title="${contactDetails.Title}" Email="${contactDetails.Email}" AddressLine1="${contactDetails.AddressLine1}" AddressLine2="${contactDetails.AddressLine2}" City="${contactDetails.City}" ZipPostCode="${contactDetails.ZipPostCode}" CountryCode="${contactDetails.CountryCode}" TelephoneNumber="${contactDetails.TelephoneNumber}" MobileNumber="${contactDetails.MobileNumber}" />
    `;

    const xmlRequestBody = `<?xml version="1.0" encoding="utf-8"?>
      <BookRequest xmlns="http://schemas.ferrygateway.org/1.2.1">
        <Context AgentAccountNumber="${AgentAccountNumber}" TimeStamp="${TimeStamp}" TransactionId="${TransactionId}" User="${User}" LanguagePrefCode="${LanguagePrefCode}" Currency="${Currency}" CountryCode="${CountryCode}" OriginatingSystem="${OriginatingSystem}" />
     
     
        <Passengers>
          ${passengersXML}
        </Passengers>
        
        
        <!--
        <Vehicles>
           ${vehiclesXML}
         </Vehicles>
-->

        ${contactDetailsXML}


        <FerryComponent>
          <Sailings>
            ${sailingsXML}
          </Sailings>
        </FerryComponent>


      </BookRequest>`;






console.log(" >>>>>>  XML Body request")
console.log(xmlRequestBody)

    const response = await axios.post(apiUrl + "/fgw/bookings/book", xmlRequestBody, {
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







router.post('/bookingsInsertion', async (req, res) => {
  const data = req.body;

  const newResponse = new booking_Collection(data);
  newResponse
    .save()
    .then(() => {
      res.status(200).json({ message: 'Data stored successfully' });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: 'Error storing data' });
    });
});





// 
router.get("/getBookingsListDB", async (req, res) => {
  try {
    const bookingsList = await booking_Collection.find();

    res.status(200).json(bookingsList);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving routes", error: error.message });
  }
});



module.exports = router;
