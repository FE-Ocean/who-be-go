import { MOVIE_URL } from './BASE_URL.js';

const serviceKey = 'NE98FTD75W4C0R4JS785';

const getMovieInfo = async (movieId: string, movieSeq: string) => {
    const url =
        MOVIE_URL +
        `&ServiceKey=${serviceKey}&detail=Y&movieId=${movieId}&movieSeq=${movieSeq}`;
    // `https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&ServiceKey=${serviceKey}&detail=Y&${movieSeq}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
        });
        const json = await response.json();
        console.log(json.Data[0].Result[0]);
        return json.Data[0].Result[0];
    } catch (err) {
        console.error(err);
    }
};

export { getMovieInfo };
