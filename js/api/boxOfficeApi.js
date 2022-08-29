import { BOX_OFFICE_URL } from '../url/BASE_URL.js';
// 일별 박스 오피스 값을 불러옵니다.
const getBoxOfficeList = async () => {
    // 영화진흥위원회 서비스 키 값
    const key = '52ae81d6ce669361445e67ea47f30077';
    // 날짜 만들어주기
    const newDate = new Date();
    const year = newDate.getFullYear();
    const month = ('0' + (1 + newDate.getMonth())).slice(-2);
    // 당일 자료는 나오지 않아서 하루 전날 값으로 대체했습니다.
    const day = newDate.getDate() - 1;
    const today = year + month + day;
    const url = `${BOX_OFFICE_URL}key=${key}&targetDt=${today}`;
    const response = await fetch(url);
    const json = await response.json();
    const boxOfficeResult = json.boxOfficeResult.dailyBoxOfficeList;
    return boxOfficeResult;
};
export { getBoxOfficeList };
