const express = require('express');
const router = express.Router();
const ApiSettings = require('../../../models/ApiSettings_Model');
const axios = require('axios');

require('dotenv').config();
const fs = require('fs');

const apiUrl=process.env.API_URL;

// Endpoint pour obtenir le token
router.post('/Authenticating_TokenGenerating', async (req, res) => {
  try {
      const apiSettings = await ApiSettings.find();

      if (apiSettings.length > 0) {
          const agentAccountNumber = apiSettings[0].agentAccountNumber;
          const password = apiSettings[0].password;
          console.log("-- agentAccountNumber and password retreived successfully agentAccountNumber: "+agentAccountNumber+" password: "+password)
        
          try {
            const body = `grant_type=password&username=${agentAccountNumber}&password=${password}`;
            const response = await axios.post(apiUrl+'/fgw/token',body, {
             
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
              }
            });
            
            const token = response.data;
            console.log("--Token")
            console.log(apiUrl)
            res.send({ token });

            console.log("The access token to be stored in the environment variable ")
            console.log(token.access_token)

            process.env.TOKEN = token.access_token; 
            console.log(process.env.TOKEN); 

            process.env.TOKEN_EXPIRING_DATE = token['.expires']; 
            console.log(process.env.TOKEN_EXPIRING_DATE); 



            const envContent = Object.keys(process.env)
            .map(key => `${key}=${process.env[key]}`)
            .join('\n');
          
          // Write the updated content to the .env file
          fs.writeFileSync('.env', envContent, { flag: 'w' });
  


            console.log(token)
          } catch (error) {
            console.error(error);
            res.status(500).send('An error occurred');
          }


      }
      else{
        console.error('Error retrieving API Settings:', error);
        res.status(500).json({ error: 'Server error' });
      }
  
  } catch (error) {
      console.error('Error retrieving API Settings:', error);
      res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
