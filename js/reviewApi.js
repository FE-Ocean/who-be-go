import { MANDARIN_URL } from './BASE_URL.js';
const token = window.localStorage.getItem('token');
const accountname = window.localStorage.getItem('accountname');
// 영화 리스트 불러오기
const getReviewList = async (skip = 0) => {
    try {
        const url = `${MANDARIN_URL}/post/${accountname}/userpost/?limit=${10}&skip=${skip}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-type': 'application/json',
            },
        });
        const json = await response.json();
        if (json.status === '404') {
            throw new Error('해당 계정이 존재하지 않습니다.');
        }
        else {
            return json.post;
        }
    }
    catch (error) {
        console.error(error);
    }
};
// 리뷰 상세글 불러오기
const getReviewDetail = async (id) => {
    try {
        const url = `${MANDARIN_URL}/post/${id}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-type': 'application/json',
            },
        });
        const json = await response.json();
        if (json.post) {
            return json.post;
        }
        else {
            location.href = '/pages/notFound.html';
            throw new Error('리뷰 상세를 불러오는 과정에서 에러가 발생했습니다.');
        }
    }
    catch (error) {
        console.error(error);
    }
};
// 리뷰 작성
const writeReview = async (reqData) => {
    const data = await fetch(MANDARIN_URL + '/post', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-type': 'application/json',
        },
        body: JSON.stringify(reqData),
    });
    const result = await data.json();
    return result.post.id;
};
// 리뷰 수정
const editReview = async (id, reqData) => {
    try {
        const data = await fetch(`${MANDARIN_URL}/post/${id}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-type': 'application/json',
            },
            body: JSON.stringify(reqData),
        });
        const result = await data.json();
        if (result.post) {
            return result.post.id;
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
};
// 리뷰 삭제
const deleteReview = async (id) => {
    try {
        const data = await fetch(`${MANDARIN_URL}/post/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-type': 'application/json',
            },
        });
        const result = await data.json();
        if (result.status !== '200') {
            throw new Error(result.message);
        }
    }
    catch (error) {
        if (error instanceof Error) {
            alert(error.message);
        }
    }
};
export { getReviewList, getReviewDetail, writeReview, editReview, deleteReview, };
