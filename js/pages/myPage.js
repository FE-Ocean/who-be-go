import { getUserInfo } from '../api/userApi.js';
import { getReviewList } from '../api/reviewApi.js';
import { hasToken } from '../api/tokenValidApi.js';
const profileImg = document.querySelector('#img-profile');
const username = document.querySelector('#text-name');
const userId = document.querySelector('#text-id');
const userIntro = document.querySelector('#text-intro');
const reviewAlbum = document.querySelector('.review-album');
const loading = document.querySelector('.wrapper-etc');
hasToken('/pages/myPage.html');
const createReviewAlbum = (reviewList) => {
    const fragment = document.createDocumentFragment();
    for (let review of reviewList) {
        const li = document.createElement('li');
        li.classList.add('card-s');
        if (review.image) {
            li.style.backgroundImage = `url(${review.image})`;
        } else {
            li.style.backgroundImage = `url(../assets/images/min_post_default.jpg)`;
        }
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
        fragment.appendChild(li);
    }
    reviewAlbum.appendChild(fragment);
};
window.addEventListener('load', async () => {
    // 유저 정보 설정
    const userInfo = await getUserInfo();
    profileImg.src = userInfo.image;
    username.textContent = userInfo.username;
    userId.textContent = userInfo.accountname;
    userIntro.textContent = userInfo.intro;
    // 유저의 리뷰 앨범 설정
    const reviewList = await getReviewList();
    createReviewAlbum(reviewList);
    loading.classList.add('disabled');
    localStorage.removeItem('previousPage');
    createObserver(reviewAlbum.lastElementChild);
});
const createObserver = (element) => {
    let skip = 10;
    const observer = new IntersectionObserver(
        async ([entry], observer) => {
            if (entry.isIntersecting) {
                observer.unobserve(entry.target);
                const newReviewList = await getReviewList(skip);
                if (newReviewList.length === 0) return;
                createReviewAlbum(newReviewList);
                if (reviewAlbum.lastElementChild instanceof HTMLLIElement) {
                    observer.observe(reviewAlbum.lastElementChild);
                }
                skip += 10;
                if (newReviewList.length < 10) {
                    observer.disconnect();
                }
            }
        },
        {
            threshold: 0.3,
            root: reviewAlbum,
        }
    );
    if (element) {
        observer.observe(element);
    }
};
