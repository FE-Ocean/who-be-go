import { getReviewDetail } from './reviewApi.js';
import PostInterface from './postInterface';

// URL 이 ?id=123123 이런식으로 온다고 가정하겠습니다.
const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const id = params.get('id');

// id값으로 받아온 리뷰상세 설정해주기
const setReviewDetail = (post: PostInterface) => {
    const h2 = document.querySelector('.movie-title');
    const imgPoster = document.querySelector('.img-poster');
    const p = document.querySelector('.text-story');
    const span = document.querySelector('.text-date');

    const contentArray = post.content.split('@');
    const movieTitle = contentArray[0];
    const rating = contentArray[2];
    const review = contentArray[3];

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

window.addEventListener('load', async () => {
    if (id !== null) {
        const currentPost = await getReviewDetail(id);
        setReviewDetail(currentPost);
    }
});
