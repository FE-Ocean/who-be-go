import { MANDARIN_URL } from '../js/BASE_URL.js';
// 로컬스토리지에 토큰이 있는지 확인
const hasToken = async () => {
    const token = localStorage.getItem('token');
    if (token === null) {
        const result = confirm('로그인이 필요한 서비스입니다. 로그인 하시겠습니까?');
        if (result) {
            location.href = '/pages/login.html';
        }
        else {
            location.href = '/index.html';
        }
    }
    else {
        tokenValid(token);
    }
};
// 로컬스토리지에 토큰이 있다면 유효성 검증
const tokenValid = async (token) => {
    try {
        const json = await fetch(MANDARIN_URL + '/user/checktoken', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-type': 'application/json',
            },
        }).then((res) => res.json());
        if (json.isValid !== true) {
            localStorage.removeItem('token');
            location.href = '/index.html';
            alert('잘못된 접근입니다.');
            throw new Error('예상치 못한 오류가 발생했습니다. 다시 시도해주세요.');
        }
    }
    catch (error) {
        console.error(error);
    }
};
export { hasToken };
