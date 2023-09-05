const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const articleRoutes = require("./routes/articleRoutes");
const categorieRepasRoutes = require("./routes/categorieRepasRoutes");
const repasRoutes = require("./routes/repasRoutes");
const listeprixRoutes = require("./routes/listeprixRoutes");
const familleRoutes = require("./routes/familleRoutes");
//cors

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/categorierepas", categorieRepasRoutes);
app.use("/api/repas", repasRoutes);
app.use("/api/listeprix", listeprixRoutes);
app.use("/api/familles", familleRoutes);

const path = require('path');



const about_API = require('./APIs/about_API.js');
app.use('/api/about_API', about_API);

const slider_API = require('./APIs/slider_API.js');
app.use('/api/slider_API', slider_API);


const footer_API = require('./APIs/footer_API.js');
app.use('/api/footer_API', footer_API);

const latestOffer_API = require('./APIs/latestOffer_API.js');
app.use('/api/latestOffer_API', latestOffer_API);

const destinationPrincipale_API = require('./APIs/destinationPrincipale_API.js');
app.use('/api/destinationPrincipale_API', destinationPrincipale_API);

const promotions_API = require('./APIs/promotions_API.js');
app.use('/api/promotions_API', promotions_API);


const SEOSettings_API = require('./APIs/SEOSettings_API.js');
app.use('/api/SEOSettings_API', SEOSettings_API);

const socialLinks_API = require('./APIs/socialLinks_API.js');
app.use('/api/socialLinks_API', socialLinks_API);

const menu_API = require('./APIs/menu_API.js');
app.use('/api/menu_API', menu_API);

const ApiSettings_API = require('./APIs/ApiSettings_API.js');
app.use('/api/ApiSettings_API', ApiSettings_API);


const authentication_tokenGenerator_API = require('./APIs/OnlineAPIsManipulation/authentication_tokenGenerator/authentication_tokenGenerator_API.js');
app.use('/api/authentication_tokenGenerator_API', authentication_tokenGenerator_API);

const getRoutes_API = require('./APIs/OnlineAPIsManipulation/getRoutes/getRoutes_API.js');
app.use('/api/getRoutes_API', getRoutes_API);


const getTimeTables_API = require('./APIs/OnlineAPIsManipulation/getTimeTables/getTimeTables_API.js');
app.use('/api/getTimeTables_API', getTimeTables_API);

const getSailings_API = require('./APIs/OnlineAPIsManipulation/getSailings/getSailings_API.js');
app.use('/api/getSailings_API', getSailings_API);

const getServices_API = require('./APIs/OnlineAPIsManipulation/getServices/getServices_API.js');
app.use('/api/getServices_API', getServices_API);

const getPassengerAndVehicleTypes_API = require('./APIs/OnlineAPIsManipulation/getPassengerAndVehicleTypes/getPassengerAndVehicleTypes_API.js');
app.use('/api/getPassengerAndVehicleTypes_API', getPassengerAndVehicleTypes_API);

const getPrice_API = require('./APIs/OnlineAPIsManipulation/getPrice/getPrice_API.js');
app.use('/api/getPrice_API', getPrice_API);


const book_API = require('./APIs/OnlineAPIsManipulation/book/book_API.js');
app.use('/api/book_API', book_API);

const recall_API = require('./APIs/OnlineAPIsManipulation/recall/recall_API.js');
app.use('/api/recall_API', recall_API);




// this is a server configuration to help displaying the images
app.use('/backend/uploads', express.static(path.join(__dirname, 'uploads')));







// Connect to MongoDB using the configuration options
mongoose
  .connect(config.db.url, config.db.options)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  });

//port
const port = process.env.PORT || 3010;
app.listen(port, () => {
  console.log(`Server is up at ${port}`);
});
