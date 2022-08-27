import { MOVIE_URL } from './BASE_URL.js';

const serviceKey = 'NE98FTD75W4C0R4JS785';

// movieId, movieSeq로 영화 정보 얻어오는 함수
const getMovieInfo = async (movieId: string, movieSeq: string) => {
    const url = `${MOVIE_URL}&ServiceKey=${serviceKey}&detail=Y&movieId=${movieId}&movieSeq=${movieSeq}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
        });
        const json = await response.json();
        return json.Data[0].Result[0];
    } catch (err) {
        console.error(err);
    }
};

// 영화 제목, 개봉 시작일로 영화 정보 얻어오는 함수
const getMovieInfoStart = async (title: string, releaseDts: string) => {
    const url = `${MOVIE_URL}&ServiceKey=${serviceKey}&title=${title}&releaseDts=${releaseDts}&detail=Y`;

    const response = await fetch(url);
    const json = await response.json();
    if (json.Data[0].Result !== undefined) {
        return json.Data[0].Result[0];
    }
};

// 영화 제목, 개봉 종료일로 영화 정보 얻어오는 함수
const getMovieInfoEnd = async (title: string, releaseDts: string) => {
    const url = `${MOVIE_URL}&ServiceKey=${serviceKey}&title=${title}&releaseDte=${releaseDts}&detail=Y`;

    const response = await fetch(url);
    const json = await response.json();
    if (json.Data[0].Result !== undefined) {
        return json.Data[0].Result[0];
    }
};

// 영화 검색 결과 얻어오는 함수
const getSearchResult = async (searchInputValue: string) => {
    const url = `${MOVIE_URL}&ServiceKey=${serviceKey}&detail=Y&listCount=17&title=${searchInputValue}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
        });
        const json = await response.json();
        return json.Data[0];
    } catch (err) {
        console.error(err);
    }
};

export { getMovieInfo, getMovieInfoStart, getMovieInfoEnd, getSearchResult };
