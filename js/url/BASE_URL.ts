//KMDB 서비스 키 값
const serviceKey = 'NE98FTD75W4C0R4JS785';

// 영화진흥위원회 서비스 키 값
const key = '52ae81d6ce669361445e67ea47f30077';

// 감귤마켓 API
const MANDARIN_URL = 'https://mandarin.api.weniv.co.kr';
// 영화 진흥 위원회 API
const BOX_OFFICE_URL = `https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${key}`;
// 한국 영화 자료원 API
const MOVIE_URL = `https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&ServiceKey=${serviceKey}`;

export { MANDARIN_URL, BOX_OFFICE_URL, MOVIE_URL };
