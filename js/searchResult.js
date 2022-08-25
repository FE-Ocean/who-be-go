var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getMovieInfo } from './movieApi.js';
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
// const movieSeq = window.location.search.slice(1);
const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const movieId = params.get('movieId');
const movieSeq = params.get('movieSeq');
postReview.addEventListener('click', () => {
    window.location.href = `../pages/writePost.html?movieId=${movieId}&movieSeq=${movieSeq}`;
});
window.addEventListener('load', () => __awaiter(void 0, void 0, void 0, function* () {
    if (movieId !== null && movieSeq !== null) {
        const movieInfo = yield getMovieInfo(movieId, movieSeq);
        showValue(movieInfo);
    }
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
