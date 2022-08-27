var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { BOX_OFFICE_URL } from './BASE_URL.js';
// 일별 박스 오피스 값을 불러옵니다.
const getBoxOfficeList = () => __awaiter(void 0, void 0, void 0, function* () {
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
    const response = yield fetch(url);
    const json = yield response.json();
    const boxOfficeResult = json.boxOfficeResult.dailyBoxOfficeList;
    return boxOfficeResult;
});
export { getBoxOfficeList };
