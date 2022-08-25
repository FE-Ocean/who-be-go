import { MOVIE_URL } from './BASE_URL.js';

const serviceKey = '노션에 있는 한국영화자료원 인증키';

const getMovieInfo = async (movieSeq: string) => {
    const url = MOVIE_URL + `&ServiceKey=${serviceKey}&detail=Y&${movieSeq}`;
    // `https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&ServiceKey=${serviceKey}&detail=Y&${movieSeq}`;

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

export { getMovieInfo };
