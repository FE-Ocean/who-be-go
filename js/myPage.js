var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getUserInfo } from './userApi.js';
import { getReviewList } from './reviewApi.js';
import { hasToken } from './tokenValid.js';
const profileImg = document.querySelector('#img-profile');
const username = document.querySelector('#text-name');
const userId = document.querySelector('#text-id');
const userIntro = document.querySelector('#text-intro');
const reviewAlbum = document.querySelector('.review-album');
const loading = document.querySelector('.wrapper-etc');
const createReviewAlbum = (review) => {
    const li = document.createElement('li');
    li.classList.add('card-s');
    li.style.backgroundImage = `url(${review.image})`;
    const a = document.createElement('a');
    a.href = `../pages/reviewDetail.html?id=${review.id}`;
    const h3 = document.createElement('h3');
    h3.textContent = '영화 제목';
    h3.classList.add('visually-hidden');
    const showContents = document.createElement('div');
    showContents.classList.add('show-contents');
    const movieTitle = document.createElement('strong');
    movieTitle.id = 'movie-title';
    movieTitle.textContent = review.content.split('@')[0];
    const ratingStar = document.createElement('div');
    const rating = parseFloat(review.content.split('@')[2]) * 20;
    ratingStar.classList.add('rate-star');
    ratingStar.style.setProperty('--width-rating', rating + '%');
    showContents.append(movieTitle, ratingStar);
    a.append(h3, showContents);
    li.append(a);
    return li;
};
window.addEventListener('load', () => __awaiter(void 0, void 0, void 0, function* () {
    hasToken();
    // 유저 정보 설정
    const userInfo = yield getUserInfo();
    profileImg.src = userInfo.image;
    username.textContent = userInfo.username;
    userId.textContent = userInfo.accountname;
    userIntro.textContent = userInfo.intro;
    // 유저의 리뷰 앨범 설정
    const reviewList = yield getReviewList();
    for (let review of reviewList) {
        reviewAlbum.appendChild(createReviewAlbum(review));
    }
    loading.classList.add('disabled');
}));
