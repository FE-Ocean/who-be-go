import { getMovieInfo } from '../api/movieApi.js';
import data from './randomMovieList.js';
const titleKo = document.querySelector('#movie-title');
const titleEng = document.querySelector('#movie-title-eng');
const relase = document.querySelector('#release');
const director = document.querySelector('#director');
const actors = document.querySelector('#actor');
const genre = document.querySelector('#genre');
const rating = document.querySelector('#rating');
const img = document.querySelector('.card-L');
const imgInfo = document.querySelector('.card-L.info');
const newBtn = document.querySelector('.btn-L.home');
const loading = document.querySelector('.wrapper-etc');
//숫자 랜덤으로 뽑아주는 함수
function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
const id = data[rand(0, 124)];
const title = id.title;
const movieSeq = id.movieSeq;
window.addEventListener('load', async () => {
    //영화 정보
    const movieInfo = await getMovieInfo({
        title: title,
        movieSeq: movieSeq,
    });
    setValue(movieInfo);
    loading.classList.add('disabled');
});
const setValue = (result) => {
    function posterUrl(posters) {
        const poster = result.posters;
        if (poster.includes('|')) {
            return poster.split('|')[0];
        } else {
            return poster;
        }
    }
    img.style.backgroundImage = "url('" + posterUrl(result.posters) + "')";
    imgInfo.style.backgroundImage = "url('" + posterUrl(result.posters) + "')";
    imgInfo.addEventListener('click', () => {
        location.href = `../pages/searchResult.html?movieId=${result.movieId}&movieSeq=${movieSeq}`;
    });
    const title = result.title
        .replace(/\!HS/g, '')
        .replace(/\s+\!HE+\s/g, '')
        .replace(/ +/g, ' ')
        .replace(/^\s+|\s+$/g, '');
    titleKo.textContent = title;
    titleEng.textContent = result.titleEng || result.titleOrg;
    relase.textContent = `${result.repRlsDate.slice(
        0,
        4
    )}.${result.repRlsDate.slice(4, 6)}.${result.repRlsDate.slice(6, 8)}`;
    if (result.directors.director[0].directorNm === '') {
        director.textContent = '정보없음';
    } else {
        director.textContent = result.directors.director[0].directorNm;
    }
    let actorBox = '';
    if (!result.actors.actor[0].actorNm) {
        actors.textContent = '정보없음';
    } else {
        for (let i = 0; i < result.actors.actor.length; i++) {
            actorBox += result.actors.actor[i].actorNm;
            actorBox += ' | ';
        }
    }
    actors.textContent = actorBox.slice(0, -2);
    if (result.genre === '') {
        genre.textContent = '정보없음';
    } else {
        let newGenres = result.genre.split(',').join(' | ');
        genre.textContent = newGenres;
    }
    if (result.rating === '') {
        rating.textContent = '정보없음';
    } else {
        rating.textContent = result.rating;
    }
};
//새로운 영화 추천 버튼
function refreshPage() {
    window.location.reload();
}
newBtn.addEventListener('click', refreshPage);
