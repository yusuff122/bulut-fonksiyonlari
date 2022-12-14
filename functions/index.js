const functions = require("firebase-functions");
const admin = require("firebase-admin");
const axios = require("axios");

admin.initializeApp();

const db = admin.firestore();

exports.saveDataToFirestore = functions.https.onRequest((request, response) => {
  axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true")
      .then((res) => {
        db.collection("coins").add(res)
            .then(() => {
              response.send(res);
            })
            .catch((err) => {
              response.send("Error " + err);
            });
      })
      .catch((err) => {
        response.send("Error REST API: " + err);
      });
});
