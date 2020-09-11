//####################################
//Madinabonu Alisherova on 2020/10/09
//####################################

const weather = require('./weather');

const query = process.argv.slice(2).join("_").replace(" ", "_");
weather.get(query);