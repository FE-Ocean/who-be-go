var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const loadingItem = document.querySelectorAll('.loading');
// 일별 박스 오피스 값을 불러옵니다.
const boxOffice = () => __awaiter(void 0, void 0, void 0, function* () {
    // 영화진흥위원회 서비스 키 값
    const key = '52ae81d6ce669361445e67ea47f30077';
    // 날짜 만들어주기
    const newDate = new Date();
    const year = newDate.getFullYear();
    const month = ('0' + (1 + newDate.getMonth())).slice(-2);
    // 당일 자료는 나오지 않아서 하루 전날 값으로 대체했습니다.
    const day = newDate.getDate() - 1;
    const today = year + month + day;
    const url = `http://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${key}&targetDt=${today}`;
    const response = yield fetch(url);
    const json = yield response.json();
    const boxOfficeResult = json.boxOfficeResult.dailyBoxOfficeList;
    return boxOfficeResult;
});
// 일별 박스 오피스 값을 넣어 영화 상세 결과값을 얻어냅니다.
const movieDetail = (boxOfficeResult) => __awaiter(void 0, void 0, void 0, function* () {
    boxOfficeResult.forEach((movie) => __awaiter(void 0, void 0, void 0, function* () {
        const serviceKey = 'NE98FTD75W4C0R4JS785';
        const title = movie.movieNm;
        const releaseDts = movie.openDt.replace(/-/gi, '');
        const url = `https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?ServiceKey=${serviceKey}&title=${title}&collection=kmdb_new2&releaseDts=${releaseDts}&detail=Y`;
        const response = yield fetch(url);
        const json = yield response.json();
        if (json.Data[0].Result !== undefined) {
            const detailResult = json.Data[0].Result[0];
            setMovieDetail(movie, detailResult);
        }
        // 만약 검색한 결과 값이 없을 경우 검색 조건을 바꿔서 한번 더 검색합니다.
        else if (json.Data[0].Result === undefined) {
            const url = `https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?ServiceKey=${serviceKey}&title=${title}&collection=kmdb_new2&releaseDte=${releaseDts}&detail=Y`;
            const response = yield fetch(url);
            const json = yield response.json();
            const detailResult = json.Data[0].Result[0];
            setMovieDetail(movie, detailResult);
        }
    }));
});
// 영화정보를 셋팅합니다.
const setMovieDetail = (movie, detailResult) => __awaiter(void 0, void 0, void 0, function* () {
    const li = document.getElementById(`rank${movie.rank}`);
    if (li instanceof HTMLLIElement) {
        li.style.backgroundImage = `url(${detailResult.posters.split('|')[0]})`;
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
    const results = yield boxOffice();
    movieDetail(results);
    hideLoading();
}));
export {};
