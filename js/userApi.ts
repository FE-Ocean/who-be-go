import { MANDARIN_URL } from './BASE_URL.js';

// 이메일 검증 결과
const getEmailValidMsg = async (reqData: object) => {
    const res = await fetch(MANDARIN_URL + '/user/emailvalid', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(reqData),
    });

    const reqJson = await res.json();

    return reqJson.message;
};

// 계정 ID 검증 결과
const getIdValidMsg = async (reqData: object) => {
    const res = await fetch(MANDARIN_URL + '/user/accountnamevalid', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(reqData),
    });

    const resJson = await res.json();
    return resJson.message;
};

// 로그인
const login = async (reqData: object) => {
    const res = await fetch(MANDARIN_URL + '/user/login', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(reqData),
    });
    const resJson = await res.json();
    return resJson;
};

// 회원 가입
const signUp = async (reqData: object) => {
    const res = await fetch(MANDARIN_URL + '/user', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(reqData),
    });
    const resJson = await res.json();
    return resJson.message;
};

export { getEmailValidMsg, getIdValidMsg, login, signUp };
