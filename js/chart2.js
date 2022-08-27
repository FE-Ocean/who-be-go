var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getBoxOfficeList } from './boxOfiiceApi.js';
import { getMovieInfoStart, getMovieInfoEnd } from './movieApi.js';
const loadingItem = document.querySelectorAll('.loading');
// 일별 박스 오피스 값을 넣어 영화 상세 결과값을 얻어냅니다.
const movieDetail = (boxOfficeResult) => __awaiter(void 0, void 0, void 0, function* () {
    boxOfficeResult.forEach((movie) => __awaiter(void 0, void 0, void 0, function* () {
        let detailResult;
        const title = movie.movieNm;
        const releaseDts = movie.openDt.replace(/-/gi, '');
        detailResult = yield getMovieInfoStart(title, releaseDts);
        // 만약 검색한 결과 값이 없을 경우 검색 조건을 바꿔서 한번 더 검색합니다.
        if (detailResult === undefined) {
            detailResult = yield getMovieInfoEnd(title, releaseDts);
        }
        setMovieDetail(movie, detailResult);
    }));
});
// 영화정보를 셋팅합니다.
const setMovieDetail = (movie, detailResult) => __awaiter(void 0, void 0, void 0, function* () {
    const li = document.getElementById(`rank${movie.rank}`);
    if (li instanceof HTMLLIElement) {
        li.style.backgroundImage = `url(${detailResult.posters.split('|')[0]})`;
        li.addEventListener('click', () => {
            location.href = `../pages/searchResult.html?movieId=${detailResult.movieId}&movieSeq=${detailResult.movieSeq}`;
        });
        const movieTitle = li.querySelector('#movie-title');
        const movieEngTitle = li.querySelector('#movie-title-eng');
        const textRelease = li.querySelector('#text-release');
        const textDirector = li.querySelector('#text-director');
        const textActor = li.querySelector('#text-actor');
        const textGenre = li.querySelector('#text-genre');
        if (movieTitle instanceof HTMLElement) {
            movieTitle.textContent = `${movie.movieNm}`;
        }
        if (movieEngTitle instanceof HTMLSpanElement) {
            movieEngTitle.textContent = `${detailResult.titleEng}`;
        }
        if (textRelease instanceof HTMLElement) {
            textRelease.textContent = `${movie.openDt}`;
        }
        if (textDirector instanceof HTMLElement) {
            textDirector.textContent = `${detailResult.directors.director[0].directorNm}`;
        }
        if (textActor instanceof HTMLElement) {
            const actors = detailResult.actors.actor;
            let actorText = '';
            for (let actor of actors) {
                actorText += actor.actorNm + ' | ';
            }
            textActor.textContent = `${actorText}`;
        }
        if (textGenre instanceof HTMLElement) {
            textGenre.textContent = `${detailResult.genre}`;
        }
    }
});
const hideLoading = () => {
    loadingItem.forEach((element) => {
        element.classList.remove('loading');
    });
};
window.addEventListener('load', () => __awaiter(void 0, void 0, void 0, function* () {
    const results = yield getBoxOfficeList();
    movieDetail(results);
    hideLoading();
}));
