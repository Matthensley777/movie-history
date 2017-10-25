"use strict";

const tmdb = require('./tmdb');
const dom = require('./dom');
const firebaseApi = require('./firebaseApi');

let userUid;

const pressEnter = () => {
  $(document).keypress((e) => {
    if (e.key === 'Enter'){
      let searchText = $('#searchBar').val();
      let query = searchText.replace(/\s/g, "%20");
      tmdb.searchMovies(query);
    }
  });

};

const myLinks = () => {
	$(document).click((e) =>{
		if(e.target.id === "navSearch"){
			$("#search").removeClass("hide");
			$("#myMovies").addClass("hide");
			$("#authScreen").addClass("hide");
		}else if (e.target.id === "mine") {
			$("#search").addClass("hide");
			$("#myMovies").removeClass("hide");
			$("#authScreen").addClass("hide");
			firebaseApi.getMovieList().then((results) =>{
				dom.clearDom('moviesMine');
				dom.domString(results, tmdb.getImgConfig(), 'moviesMine');
			}).catch((err) =>{
				console.log("error in getMovieList", err);
			});
		}else if (e.target.id === "authenticate"){
			$("#search").addClass("hide");
			$("#myMovies").addClass("hide");
			$("#authScreen").removeClass("hide");
		}
	});
};

const googleAuth = () => {
	$('#googleButton').click((e) =>{
		firebaseApi.authenticateGoogle().then().catch((err) =>{
			console.log("error in authenticateGoogle", err);
		});
	});
};

const wishListEvent = () => {
	$("body").on("click", ".wishlist", (e) => {
		console.log("wishlist event", e);
		let mommy = e.target.closest(".movie");
		let newMovie = {
			"title": $(mommy).find(".title").html(),
			"overview": $(mommy).find(".overview").html(),
			"poster_path": $(mommy).find(".poster_path").attr("src").split('/').pop(),
			"rating": 0,
			"isWatched": false,
			"uid": ""
		};
		console.log("newMovie", newMovie);
		firebaseApi.saveMovie().then((results) => {
			console.log("saveMovie results", results);
		}).catch((err) => {
			console.log("error in saveMovie", err);
		});
	});
};

const saveMovie = (movie) => {
	movie.uid = userUid;
	return new Promise((resolve, reject) => {
		$.ajax({
			mothod: "POST",
			url:`${firebaseApi.fireBaseKey.databaseURL}/movies.json`,
			data: JSON.stringify(movie)
		}).then((result)=> {
			resolve(result);
		}).catch((error)=> {
			reject(error);
		});
	});
};



const deleteMovie = () => {
	$("body").on("click", "delete", () => {
		let movieId = "";
	});
};




























module.exports = {pressEnter, myLinks, googleAuth, wishListEvent, saveMovie};