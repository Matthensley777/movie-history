"use strict";

let tmdbKeys;
let imgConfig;
let dom = require('./dom');


const searchTMDB = (query) => {
    return new Promise((resolve, reject) => {
        $.ajax(`https://api.themoviedb.org/3/search/movie?api_key=${tmdbKeys}&language=en-US&page=1&include_adult=false&query=${query}`).done((data) => {
            console.log(data);
            resolve(data.results);
        }).fail((error) => {
            reject(error);
        });
    });
};

const tmdbConfigureation = () => {
    return new Promise((resolve, reject) => {
        $.ajax(`https://api.themoviedb.org/3/configuration?api_key=${tmdbKeys}`).done((data) => {
            resolve(data.images);
        }).fail((error) => {
            reject(error);
        });
    });
};

const getConfig = () => {
    tmdbConfigureation().then((results) => {
        imgConfig = results;
        console.log("getconfig", imgConfig);
    }).catch((error) => {
        console.log(error);
    });
};

const searchMovie = (query) => {
    searchTMDB(query).then((data) => {
        showResults(data);
    }).catch((error) => {
        console.log("error in search movie", error);
    });
};

const setKeys = (apiKey) => {
    tmdbKeys = apiKey;
    getConfig();
};

const showResults = (movieArray) => {
    dom.clearDom();
    dom.domString(movieArray, imgConfig);
};





module.exports = {
    setKeys,
    searchMovie
};