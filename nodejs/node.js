#!/usr/bin/env node  
const fs = require("fs");
const express = require('express');
const cors = require('cors');
var http = require('http');
var https = require('https');
const app = express();
const host = '127.0.0.1';
const port = process.env.PORT || 8080;


// your express configuration here
var privateKey  = fs.readFileSync('/etc/letsencrypt/live/node.silentlive.gq/privkey.pem', 'utf8');
var certificate = fs.readFileSync('/etc/letsencrypt/live/node.silentlive.gq/fullchain.pem', 'utf8');
var credentials = {key: privateKey, cert: certificate};

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

// For http
httpServer.listen(8080);
// For https
httpsServer.listen(8443);

/*For Cors Web Policy*/
app.use(cors({
    methods: 'GET,POST,PATCH,DELETE,OPTIONS',
    optionsSuccessStatus: 200,
    origin: 'https://silentlive.gq'
  }));
app.options('*', cors());

// routes will go here
app.get('/api', function(req, res) {

    res.setHeader('Access-Control-Allow-Origin', 'https://silentlive.gq');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Max-Age', 2592000); // 30 days
    const xTag_id = req.query.id;

    const { exec } = require('child_process');
    var $tag = xTag_id;
    // Send Curl Command
    exec('curl --header "X-Authorization: ApiKeyGoesHere!" https://xbl.io/api/v2/search/' + $tag + ' -o xboxProfile.json', (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(`Sending Curl:  = ${stdout}`);
        if (stderr!= "")
        console.error(`stderr: ${stderr}`);

        fs.readFile("./xboxProfile.json", "utf8", (err, profile) => {
            if (err) {
                    console.log("Error reading file from disk:", err);
                return;
            }
            try 
            {
                const xboxProfile = JSON.parse(profile);
                if(Object.keys(xboxProfile.people).length === 0 &&  xboxProfile.people.constructor === Object) {
                    console.log("Object is empty");

                    res.send({
                        'xuid': 'Profile Unknown'
                    });
                    
                } else {

                    console.log("Object is not empty");
                    console.log("Xuid:", xboxProfile.people[0].xuid); // => "Reads Xuid from json file"
                    console.log("AvatarPic:", xboxProfile.people[0].displayPicRaw);
                    console.log("Gamertag:", xboxProfile.people[0].gamertag);
                    console.log("GamerScore:", xboxProfile.people[0].gamerScore);
                    console.log("xboxOneRep:", xboxProfile.people[0].xboxOneRep);
                        
                    res.send({
                        'xuid': xboxProfile.people[0].xuid,
                        'AvatarPic': xboxProfile.people[0].displayPicRaw,
                        'Gamertag': xboxProfile.people[0].gamertag,
                        'GamerScore': xboxProfile.people[0].gamerScore,
                        'xboxOneRep': xboxProfile.people[0].xboxOneRep
                    });
                }

            }  catch (err) {
                console.log("Error parsing JSON string:", err);
                console.log("Most Likely Profile doesn't exist!");
                res.send({
                    'xuid': 'Profile Unknown'
                });
            }

        });

    });

});
console.log('Server started at Http port: ' + 8000 + ' & Htpps: ' + 8443);



