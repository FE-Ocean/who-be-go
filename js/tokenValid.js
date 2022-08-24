var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { MANDARIN_URL } from '../js/BASE_URL.js';
// 로컬스토리지에 토큰이 있는지 확인
const hasToken = () => __awaiter(void 0, void 0, void 0, function* () {
    const token = localStorage.getItem('token');
    if (token === null) {
        const result = confirm('로그인이 필요한 서비스입니다. 로그인 하시겠습니까?');
        if (result) {
            location.href = '/pages/login.html';
        }
        else {
            location.href = '/';
        }
    }
    else {
        tokenValid(token);
    }
});
// 로컬스토리지에 토큰이 있다면 유효성 검증
const tokenValid = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const json = yield fetch(MANDARIN_URL + '/user/checktoken', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-type': 'application/json',
            },
        }).then((res) => res.json());
        if (json.isValid !== true) {
            localStorage.removeItem('token');
            location.href = '/';
            alert('잘못된 접근입니다.');
            throw new Error('예상치 못한 오류가 발생했습니다. 다시 시도해주세요.');
        }
    }
    catch (error) {
        console.error(error);
    }
});
export { hasToken };
