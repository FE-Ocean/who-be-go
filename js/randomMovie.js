var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { MOVIE_URL } from './BASE_URL.js';
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
//숫자 랜덤으로 뽑아주는 함수
function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
const id = data[rand(1, 98)];
const title = id.title;
const movieSeq = id.movieSeq;
const serviceKey = 'NE98FTD75W4C0R4JS785';
//영화 정보
function getMovieInfo() {
    return __awaiter(this, void 0, void 0, function* () {
        const url = MOVIE_URL +
            `&detail=Y&title=${title}&movieSeq=${movieSeq}&ServiceKey=${serviceKey}`;
        console.log(url);
        try {
            const response = yield fetch(url, {
                method: 'GET',
            });
            const reqJson = yield response.json();
            const result = yield reqJson.Data[0].Result[0];
            console.log(result.title);
            const title = result.title
                .replace(/\!HS/g, '')
                .replace(/\s+\!HE+\s/g, '')
                .replace(/ +/g, ' ')
                .replace(/^\s+|\s+$/g, '');
            const actor = `${result.actors.actor[0].actorNm} | ${result.actors.actor[1].actorNm} | ${result.actors.actor[2].actorNm} `;
            function posterUrl(posters) {
                const poster = result.posters;
                if (poster.includes('|')) {
                    return poster.split('|')[0];
                }
                else {
                    return poster;
                }
            }
            titleKo.textContent = title;
            titleEng.textContent = result.titleEng || result.titleOrg;
            relase.textContent = `${result.repRlsDate.slice(0, 4)}.${result.repRlsDate.slice(4, 6)}.${result.repRlsDate.slice(6, 8)}`;
            director.textContent = result.directors.director[0].directorNm;
            actors.textContent = actor;
            genre.textContent = result.genre.replaceAll(',', ' | ');
            rating.textContent = result.rating;
            img.style.backgroundImage = "url('" + posterUrl(result.posters) + "')";
            imgInfo.style.backgroundImage =
                "url('" + posterUrl(result.posters) + "')";
        }
        catch (err) {
            console.error(err);
        }
    });
}
getMovieInfo();
