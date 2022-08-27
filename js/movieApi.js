import { MOVIE_URL } from './BASE_URL.js';
const serviceKey = 'NE98FTD75W4C0R4JS785';
// 영화 정보 얻어오는 함수 (인자로 쿼리 받음)
const getMovieInfo = async (queryObj) => {
    let queryString = '';
    Object.entries(queryObj).map(([key, value]) => {
        queryString += `&${key}=${value}`;
    });
    const url = `${MOVIE_URL}&ServiceKey=${serviceKey}&detail=Y${queryString}`;
    try {
        const response = await fetch(url, {
            method: 'GET',
        });
        const json = await response.json();
        return json.Data[0].Result[0];
    }
    catch (err) {
        console.error(err);
    }
};
// 영화 검색 결과 얻어오는 함수
const getSearchResult = async (searchInputValue) => {
    const url = `${MOVIE_URL}&ServiceKey=${serviceKey}&detail=Y&listCount=17&title=${searchInputValue}`;
    try {
        const response = await fetch(url, {
            method: 'GET',
        });
        const json = await response.json();
        return json.Data[0];
    }
    catch (err) {
        console.error(err);
    }
};
export { getMovieInfo, getSearchResult };
