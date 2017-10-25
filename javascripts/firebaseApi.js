"use strict";

let fireBaseKey = "";
let userUid = "";

const setKey = (key) => {
	fireBaseKey = key;
};

//Firebase: GOOGLE - Use input credentials to authenticate user.
  let authenticateGoogle = () => {
    return new Promise((resolve, reject) => {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider)
        .then((authData) => {
        	userUid = authData.user.uid;
            resolve(authData.user);
        }).catch((error) => {
            reject(error);
        });
    });
  };

 const getMovieList = () => {
	let movies = [];
	return new Promise((resolve, reject) =>{
		$.ajax(`${fireBaseKey.databaseURL}/movies.json?orderBy="uid"&equalTo="${userUid}"`).then((fbMovies) =>{
			if(fbMovies != null){
				Object.keys(fbMovies).forEach((key) =>{
					fbMovies[key].id = key;  
					movies.push(fbMovies[key]);
				});
			}

			resolve(movies);
		}).catch((err) =>{
			reject(err);
		});
	});
};

const saveMovie = (movie) => {
	movie.uid = userUid;
	return new Promise((resolve, reject) => {
		$.ajax({
			mothod: "POST",
			url:`${fireBaseKey.databaseURL}/movies.json`,
			data: JSON.stringify(movie)
		}).then((result)=> {
			resolve(result);
		}).catch((error)=> {
			reject(error);
		});
	});
};

const deleteMovie = (movieId) => {
	return new Promise((resolve, reject) => {
		$.ajax({
			method: "DELETE",
			url: `${fireBaseKey.databaseURL}/movies/${movieId}.json`,
		}).then((fbMoviee) => {
			resolve(fbMoviee);
		}).catch((err) => {
			reject(err);
		});
	});
};








module.exports = {setKey, authenticateGoogle, getMovieList, saveMovie, deleteMovie};