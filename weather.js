//####################################
//Madinabonu Alisherova on 2020/10/09
//####################################


const https = require('https');
const http = require('http');
const api = require("./api.json");

function printWeather(weather) { 
    const message = `Current temperature in ${weather.location.city} is ${weather.current_observation.temp_f}F`;
    console.log(message);
 }

function printError(error){
    console.log(error.message);
}

function get(query){
//Using underscore for readibility
    const readableQuery = query.replace("_", " ");
    try{

    const request = https.get(`https://api.wunderground.com/api/${api.key}/geolookup/conditions/q/${query}.json`,

        response => {
            if(response.statusCode === 200){
            let body = "";
            //Reading the data
            response.on('data', data => {
                body += data;
            });

            response.on('end', () => {
                try{
                    //Parse data
                    const weather = JSON.parse(body);
                    //if location was found or not
                  if(weather.location){
                      //Print data
                      printWeather(weather);
                  } else {
                      const queryError = new Error(`The location "${readableQuery}" was not found`);
                      printError(queryError);
                  }
                } catch(error){
                    //Parse Error
                    printError(queryError);
                }
            });
        } else {
            //Status code Error
            const statusCodeError = new Error(`There was an error getting for ${readableQuery}. (${http.STATUS_CODES[response.statusCode]})`);
            printError(statusCodeError);

        }
    });
    request.on("error", printError);
} catch(error) {
    //Malformed URL Error
    printError(queryError);

  }
}

module.exports.get = get;

