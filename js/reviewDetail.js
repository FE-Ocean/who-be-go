var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getReviewDetail, deleteReview } from './reviewApi.js';
const modalButton = document.querySelector('.btn-modal');
const modalDropbox = document.querySelector('.modal-dropbox');
const modalAlertContainer = document.querySelectorAll('.modal-alert-container')[1];
// 수정 버튼
const buttonEdit = document.querySelector('#btn-edit');
// (드롭박스의) 삭제 버튼
const buttonShowAlert = document.querySelector('#btn-show-alert');
// (모달의) 삭제 버튼
const buttonDelete = document.querySelector('#btn-delete');
// URL 이 ?id=123123 이런식으로 온다고 가정하겠습니다.
const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const id = params.get('id');
// id값으로 받아온 리뷰상세 설정해주기
const setReviewDetail = (post) => {
    console.log(post);
    const h2 = document.querySelector('.movie-title');
    const imgRating = document.querySelector('.wrapper-rating');
    const imgPoster = document.querySelector('.img-poster');
    const p = document.querySelector('.text-story');
    const span = document.querySelector('.text-date');
    const contentArray = post.content.split('@');
    const movieTitle = contentArray[0];
    const rating = contentArray[2];
    const review = contentArray[3];
    const widthRating = (parseFloat(rating) / 5) * 100 + '%';
    if (h2 instanceof HTMLHeadingElement) {
        h2.textContent = movieTitle;
    }
    if (imgRating instanceof HTMLDivElement) {
        imgRating.style.setProperty('--width-rating', widthRating);
    }
    if (imgPoster instanceof HTMLImageElement) {
        if (post.image === '' ||
            post.image === 'https://mandarin.api.weniv.co.kr/undefined') {
            imgPoster.src = '../assets/images/max_post_default.jpg';
        }
        else {
            imgPoster.src = `${post.image}`;
        }
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
window.addEventListener('load', () => __awaiter(void 0, void 0, void 0, function* () {
    if (id !== null) {
        const currentPost = yield getReviewDetail(id);
        setReviewDetail(currentPost);
    }
}));
modalButton.addEventListener('click', () => {
    modalDropbox.classList.toggle('disabled');
});
window.addEventListener('click', (e) => {
    const target = e.target;
    if (!target.classList.contains('ico-modal')) {
        modalDropbox.classList.add('disabled');
    }
});
buttonEdit.addEventListener('click', () => {
    window.location.href = `../pages/reviewEdit.html?id=${id}`;
});
buttonShowAlert.addEventListener('click', () => {
    modalAlertContainer.classList.remove('disabled');
});
buttonDelete.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    if (id !== null) {
        yield deleteReview(id);
        modalAlertContainer.classList.add('disabled');
        window.location.href = '../pages/review.html';
    }
}));
