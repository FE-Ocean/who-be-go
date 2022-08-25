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
export { getEmailValidMsg, getIdValidMsg, login, signUp };
