"use strict";
// import { MOVIE_URL } from './BASE_URL.js';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const title = document.querySelector('.movie-title');
const titleEng = document.querySelector('.sub-movie-title');
const poster = document.querySelector('.poster-card');
const release = document.querySelector('.release');
const director = document.querySelector('.director');
const actor = document.querySelector('.actor');
const genre = document.querySelector('.genre');
const runtime = document.querySelector('.runtime');
const rating = document.querySelector('.rating');
const summary = document.querySelector('.movie-summary>dd');
const postReview = document.querySelector('.container-review-btn>button');
const movieSeq = window.location.search.slice(1);
postReview.addEventListener('click', () => {
    window.location.href = `../pages/writePost.html?${movieSeq}`;
});
function getMovieInfo() {
    return __awaiter(this, void 0, void 0, function* () {
        const url = 
        // MOVIE_URL +
        // `&ServiceKey=&detail=Y&movieSeq=${getValue}`;
        `https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&ServiceKey=&detail=Y&${movieSeq}`;
        try {
            const response = yield fetch(url, {
                method: 'GET',
            });
            const json = yield response.json();
            showValue(json.Data[0].Result[0]);
            console.log(json.Data[0].Result[0]);
        }
        catch (err) {
            console.error(err);
        }
    });
}
window.addEventListener('load', () => __awaiter(void 0, void 0, void 0, function* () {
    yield getMovieInfo();
}));
const showValue = (movie) => {
    title.textContent = movie.title;
    titleEng.textContent = movie.titleEng;
    if (movie.posters !== '') {
        poster.src = movie.posters.substring(0, 60);
    }
    else {
        poster.src = '../assets/images/post_default.jpg';
    }
    if (movie.repRlsDate === '') {
        release.textContent = movie.prodYear;
    }
    else {
        release.textContent =
            movie.repRlsDate.slice(0, 4) +
                '.' +
                movie.repRlsDate.slice(4, 6) +
                '.' +
                movie.repRlsDate.slice(6);
    }
    director.textContent = movie.directors.director[0].directorNm;
    let actorBox = '';
    for (let i = 0; i < 4; i++) {
        actorBox += movie.actors.actor[i].actorNm;
        actorBox += ' | ';
    }
    actor.textContent = actorBox.slice(0, -2);
    genre.textContent = movie.genre.replace(/,/g, ' | ');
    runtime.textContent = movie.runtime + '분';
    rating.textContent = movie.rating;
    if (movie.plots.plot[0].plotText === '') {
        summary.textContent = '줄거리가 제공되지 않습니다 :)';
    }
    else {
        summary.textContent = movie.plots.plot[0].plotText;
    }
};
