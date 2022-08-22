import { MANDARIN_URL } from './BASE_URL.js';
import PostInterface from './postInterface';

// URL 이 ?id=123123 이런식으로 온다고 가정하겠습니다.
const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const id = params.get('id');

// 리뷰 상세글 불러오기
const getReviewDetail = async (id: string) => {
    console.log(id);
    try {
        const token = window.localStorage.getItem('token');
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
            setReviewDetail(json.post);
        } else {
            throw new Error(
                '리뷰 상세를 불러오는 과정에서 에러가 발생했습니다.'
            );
        }
    } catch (error) {
        console.error(error);
    }
};

// id값으로 받아온 리뷰상세 설정해주기
const setReviewDetail = (post: PostInterface) => {
    const h2 = document.querySelector('.movie-title');
    const imgPoster = document.querySelector('.img-poster');
    const p = document.querySelector('.text-story');
    const span = document.querySelector('.text-date');

    const contentArray = post.content.split('@');
    const movieTitle = contentArray[0];
    const rating = contentArray[1];
    const review = contentArray[2];

    if (h2 instanceof HTMLHeadingElement) {
        h2.textContent = movieTitle;
    }

    if (imgPoster instanceof HTMLImageElement) {
        imgPoster.src = `${post.image}`;
    }

    if (p instanceof HTMLParagraphElement) {
        p.textContent = review;
    }

    if (span instanceof HTMLSpanElement) {
        span.textContent = `${post.createdAt
            .slice(0, 11)
            .replace('-', '년 ')
            .replace('-', '월 ')
            .replace('T', '일')}`;
    }
};

// 현재는 임시 ID값을 넣어주었습니다.
if (id !== null) {
    getReviewDetail(id);
}
