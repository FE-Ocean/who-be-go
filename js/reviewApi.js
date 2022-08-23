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
// 영화 리스트 불러오기
const getReviewList = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const url = `${MANDARIN_URL}/post/${accountname}/userpost`;
        const response = yield fetch(url, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-type': 'application/json',
            },
        });
        const json = yield response.json();
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
});
// 리뷰 상세글 불러오기
const getReviewDetail = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const url = `${MANDARIN_URL}/post/${id}`;
        const response = yield fetch(url, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-type': 'application/json',
            },
        });
        const json = yield response.json();
        if (json.post) {
            return json.post;
        }
        else {
            throw new Error('리뷰 상세를 불러오는 과정에서 에러가 발생했습니다.');
        }
    }
    catch (error) {
        console.error(error);
    }
});
// 리뷰 작성
const writeReview = (reqData) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield fetch(MANDARIN_URL + '/post', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-type': 'application/json',
        },
        body: JSON.stringify(reqData),
    });
    const result = yield data.json();
    return result.post.id;
});
// 리뷰 수정
const editReview = (id, reqData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield fetch(`${MANDARIN_URL}/post/${id}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-type': 'application/json',
            },
            body: JSON.stringify(reqData),
        });
        const result = yield data.json();
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
});
// 리뷰 삭제
const deleteReview = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield fetch(`${MANDARIN_URL}/post/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-type': 'application/json',
            },
        });
        const result = yield data.json();
        if (result.status !== '200') {
            throw new Error(result.message);
        }
    }
    catch (error) {
        if (error instanceof Error) {
            alert(error.message);
        }
    }
});
export { getReviewList, getReviewDetail, writeReview, editReview, deleteReview, };
