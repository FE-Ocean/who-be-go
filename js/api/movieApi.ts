import { MOVIE_URL } from '../url/BASE_URL.js';

// 영화 정보 얻어오는 함수 (인자로 쿼리 받음)
const getMovieInfo = async (queryObj: object) => {
    let queryString = '';
    Object.entries(queryObj).map(([key, value]) => {
        queryString += `&${key}=${value}`;
    });
    const url = `${MOVIE_URL}&detail=Y${queryString}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
        });
        const json = await response.json();
        if (json.TotalCount !== 0) {
            return json.Data[0].Result[0];
        } else {
            return json;
        }
    } catch (err) {
        window.location.href = './notFound.html';
        console.error(err);
    }
};

// 영화 검색 결과 얻어오는 함수
const getSearchResult = async (queryObj: object) => {
    let queryString = '';
    Object.entries(queryObj).map(([key, value]) => {
        queryString += `&${key}=${value}`;
    });

    const url = `${MOVIE_URL}&detail=Y&listCount=100&sort=prodYear,1${queryString}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
        });
        const json = await response.json();
        return json.Data[0];
    } catch (err) {
        location.href = '/pages/notFound.html';
        console.error(err);
    }
};

export { getMovieInfo, getSearchResult };
