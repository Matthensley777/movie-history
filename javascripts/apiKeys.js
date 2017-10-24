"use strict";

const tmdb = require('./tmdb');
const firebaseApi = require('./firebaseApi');


const apiKeys = () => {
    return new Promise((resolve, reject) => {
        $.ajax('./db/apiKeys.json').done((data) => {
            resolve(data.apiKeys);
        }).fail((error) => {
            reject(error);
        });
    });
};

const retrieveKeys = () => {
    apiKeys().then((results) => {
        tmdb.setKeys(results.tmdb.apiKey);
        console.log(results.fireBaseKeys);
        firebaseApi.setKey(results.fireBaseKeys);
        firebase.initializeApp(results.fireBaseKeys);
        console.log("initializeApp");
    }).catch((error) => {
        console.log("error in retrieve keys", error);
    });
};

module.exports = {
    retrieveKeys
};