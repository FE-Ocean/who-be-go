import { MANDARIN_URL } from './BASE_URL.js';

const token = window.localStorage.getItem('token');
const accountname = window.localStorage.getItem('accountname');

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

// 계정 정보 불러오기
const getUserInfo = async () => {
    try {
        const data = await fetch(`${MANDARIN_URL}/profile/${accountname}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-type': 'application/json',
            },
        });
        const result = await data.json();
        if (result.profile) {
            return result.profile;
        } else {
            throw new Error(result.message);
        }
    } catch (error) {
        if (error instanceof Error) {
            alert(error.message);
        }
    }
};

export { getEmailValidMsg, getIdValidMsg, login, signUp, getUserInfo };
