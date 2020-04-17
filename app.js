const express = require("express");
const app = express();
const https = require("https");
// const got = require("got");

app.set('view engine', 'ejs');
app.use(express.static('public'));

var conf = "";
var recov = "";
var active = "";
var deaths = "";

app.get("/", function (req, res) {
    var chunks = [];
    var states = [];
    var statesActive = [];
    https.get("https://api.covid19india.org/data.json", function (resp) {
        resp.on("data", function (data) {
            chunks.push(data);
        });
        resp.on("end", function (chunk) {
            var body = Buffer.concat(chunks);
            var parsedData = JSON.parse(body);
            conf = parsedData.statewise[0].confirmed;
            active = parsedData.statewise[0].active;
            recov = parsedData.statewise[0].recovered;
            deaths = parsedData.statewise[0].deaths;
            for (var i = 1; i < 7; i++) {
                states.push(parsedData.statewise[i].state);
                statesActive.push(parsedData.statewise[i].active);
            }
            console.log(states);
            console.log(statesActive);
            res.render("index", {
                conf: conf,
                active: active,
                recov: recov,
                deaths: deaths,
                st1: states[0],
                st2: states[1],
                st3: states[2],
                st4: states[3],
                st5: states[4],
                st6: states[5],
                ac1: statesActive[0],
                ac2: statesActive[1],
                ac3: statesActive[2],
                ac4: statesActive[3],
                ac5: statesActive[4],
                ac6: statesActive[5]
            });
        });
    });
});

app.listen(3000, function () {
    console.log("Server started at port 3000");
});