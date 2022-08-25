var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { MANDARIN_URL } from './BASE_URL.js';
const token = window.localStorage.getItem('token');
const accountname = window.localStorage.getItem('accountname');
// 이메일 검증 결과
const getEmailValidMsg = (reqData) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield fetch(MANDARIN_URL + '/user/emailvalid', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(reqData),
    });
    const reqJson = yield res.json();
    return reqJson.message;
});
// 계정 ID 검증 결과
const getIdValidMsg = (reqData) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield fetch(MANDARIN_URL + '/user/accountnamevalid', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(reqData),
    });
    const resJson = yield res.json();
    return resJson.message;
});
// 로그인
const login = (reqData) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield fetch(MANDARIN_URL + '/user/login', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(reqData),
    });
    const resJson = yield res.json();
    return resJson;
});
// 회원 가입
const signUp = (reqData) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield fetch(MANDARIN_URL + '/user', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(reqData),
    });
    const resJson = yield res.json();
    return resJson.message;
});
// 계정 정보 불러오기
const getUserInfo = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield fetch(`${MANDARIN_URL}/profile/${accountname}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-type': 'application/json',
            },
        });
        const result = yield data.json();
        if (result.profile) {
            return result.profile;
        }
        else {
            throw new Error(result.message);
        }
    }
    catch (error) {
        if (error instanceof Error) {
            alert(error.message);
        }
    }
});
export { getEmailValidMsg, getIdValidMsg, login, signUp, getUserInfo };
