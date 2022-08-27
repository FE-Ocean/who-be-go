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
const serviceKey = 'NE98FTD75W4C0R4JS785';
// movieId, movieSeq로 영화 정보 얻어오는 함수
const getMovieInfo = (movieId, movieSeq) => __awaiter(void 0, void 0, void 0, function* () {
    const url = `${MOVIE_URL}&ServiceKey=${serviceKey}&detail=Y&movieId=${movieId}&movieSeq=${movieSeq}`;
    try {
        const response = yield fetch(url, {
            method: 'GET',
        });
        const json = yield response.json();
        return json.Data[0].Result[0];
    }
    catch (err) {
        console.error(err);
    }
});
// 영화 제목, 개봉 시작일로 영화 정보 얻어오는 함수
const getMovieInfoStart = (title, releaseDts) => __awaiter(void 0, void 0, void 0, function* () {
    const url = `${MOVIE_URL}&ServiceKey=${serviceKey}&title=${title}&releaseDts=${releaseDts}&detail=Y`;
    const response = yield fetch(url);
    const json = yield response.json();
    if (json.Data[0].Result !== undefined) {
        return json.Data[0].Result[0];
    }
});
// 영화 제목, 개봉 종료일로 영화 정보 얻어오는 함수
const getMovieInfoEnd = (title, releaseDts) => __awaiter(void 0, void 0, void 0, function* () {
    const url = `${MOVIE_URL}&ServiceKey=${serviceKey}&title=${title}&releaseDte=${releaseDts}&detail=Y`;
    const response = yield fetch(url);
    const json = yield response.json();
    if (json.Data[0].Result !== undefined) {
        return json.Data[0].Result[0];
    }
});
// 영화 검색 결과 얻어오는 함수
const getSearchResult = (searchInputValue) => __awaiter(void 0, void 0, void 0, function* () {
    const url = `${MOVIE_URL}&ServiceKey=${serviceKey}&detail=Y&listCount=100&sort=prodYear,1&title=${searchInputValue}`;
    try {
        const response = yield fetch(url, {
            method: 'GET',
        });
        const json = yield response.json();
        return json.Data[0];
    }
    catch (err) {
        console.error(err);
    }
});
export { getMovieInfo, getMovieInfoStart, getMovieInfoEnd, getSearchResult };
