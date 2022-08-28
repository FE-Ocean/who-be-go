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
const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const movieId = params.get('movieId');
const movieSeq = params.get('movieSeq');
const loading = document.querySelector('.wrapper-etc');
postReview.addEventListener('click', () => {
    window.location.href = `../pages/writePost.html?movieId=${movieId}&movieSeq=${movieSeq}`;
});
window.addEventListener('load', async () => {
    if (movieId !== null && movieSeq !== null) {
        const movieInfo = await getMovieInfo({
            movieId: movieId,
            movieSeq: movieSeq,
        });
        showValue(movieInfo);
    }
    loading.classList.add('disabled');
});
const showValue = (movie) => {
    title.textContent = movie.title;
    if (movie.titleEng === '') {
        titleEng.textContent = movie.titleOrg;
    }
    else {
        titleEng.textContent = movie.titleEng;
    }
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
    if (movie.directors.director[0].directorNm === '') {
        director.textContent = '정보 없음';
    }
    else {
        director.textContent = movie.directors.director[0].directorNm;
    }
    let actorBox = '';
    if (!movie.actors.actor[0].actorNm) {
        actor.textContent = '정보 없음';
    }
    else {
        for (let i = 0; i < movie.actors.actor.length; i++) {
            actorBox += movie.actors.actor[i].actorNm;
            actorBox += ' | ';
        }
        actor.textContent = actorBox.slice(0, -2);
    }
    if (movie.genre === '') {
        genre.textContent = '정보 없음';
    }
    else {
        genre.textContent = movie.genre.replace(/,/g, ' | ');
    }
    if (movie.runtime === '') {
        runtime.textContent = '정보 없음';
    }
    else {
        runtime.textContent = movie.runtime + '분';
    }
    if (movie.rating === '') {
        rating.textContent = '정보 없음';
    }
    else {
        rating.textContent = movie.rating;
    }
    if (movie.plots.plot[0].plotText === '') {
        summary.textContent = '줄거리가 제공되지 않습니다 :)';
    }
    else {
        summary.textContent = movie.plots.plot[0].plotText;
    }
};
