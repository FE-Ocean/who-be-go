import { BOX_OFFICE_URL } from '../url/BASE_URL.js';
// 일별 박스 오피스 값을 불러옵니다.
const getBoxOfficeList = async () => {
    // 날짜 만들어주기
    // 현재 날짜
    const now = new Date();
    // 어제 날짜 당일 자료는 나오지 않아서 하루 전날 값으로 대체했습니다.
    const yesterday = new Date(now.setDate(now.getDate() - 1));
    const year = yesterday.getFullYear();
    const month = ('0' + (1 + yesterday.getMonth())).slice(-2);
    // 당일 자료는 나오지 않아서 하루 전날 값으로 대체했습니다.
    const day = yesterday.getDate() < 10
        ? '0' + yesterday.getDate()
        : yesterday.getDate();
    const today = year + month + day;
    const url = `${BOX_OFFICE_URL}&targetDt=${today}`;
    console.log(url);
    const response = await fetch(url);
    const json = await response.json();
    const boxOfficeResult = json.boxOfficeResult.dailyBoxOfficeList;
    return boxOfficeResult;
};
export { getBoxOfficeList };
