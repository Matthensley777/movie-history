"use strict";

let tmdbKeys;

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

const searchMovie = (query) => {
	searchTMDB(query).then((data) => {
		showResults(data);
	}).catch((error) => {
		console.log("error in search movie", error);
	});
};

const setKeys = (apiKey) => {
    tmdbKeys = apiKey;
    console.log(tmdbKeys);
};

const showResults = (movieArray) => {
    dom.domString(movieArray);
    dom.clearDom();
};

module.exports = {setKeys, searchMovie};