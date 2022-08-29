import { handleUploadImage } from '../api/imageApi.js';
import { getReviewDetail, editReview } from '../api/reviewApi.js';
const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const id = params.get('id');
const movieTitle = document.querySelector('#movie-title');
const movieSubTitle = document.querySelector('#movie-title-eng');
const textRating = document.querySelector('#text-rating');
const radioRating = document.querySelectorAll('.radio-rating');
const imgContainer = document.querySelector('.img-container');
const imgReview = document.querySelector('#img-review');
const closeButton = document.querySelector('#btn-close');
const imgInput = document.querySelector('#img-input');
const textReview = document.querySelector('#text-review');
const saveButton = document.querySelector('#btn-save');
const loading = document.querySelector('.wrapper-etc');
// 서버로 전송할 이미지 (파일 정보가 담김)
let img;
const IMG_MAX_SIZE = 10 * 1024 * 1024;
// 이미지 url
let imgUrl = '';
const fileTypeArray = [
    'image/gif',
    'image/jpeg',
    'image/png',
    'image/bmp',
    'image/tiff',
    'image/heic',
];
const setTextHeight = (e) => {
    const target = e.currentTarget;
    target.style.height = textReview.scrollHeight + 'px';
    if (target.value.length > 0) {
        saveButton.classList.remove('disabled');
    } else {
        saveButton.classList.add('disabled');
    }
};
// 감상문 수정
const handleEditReview = async (e) => {
    e.preventDefault();
    if (img) {
        imgUrl = await handleUploadImage(img);
    }
    const reqData = {
        post: {
            content:
                movieTitle.textContent +
                '@' +
                movieSubTitle.textContent +
                '@' +
                textRating.textContent +
                '@' +
                textReview.value,
            image: imgUrl,
        },
    };
    const postId = await editReview(id, reqData);
    if (postId) {
        window.location.href = `/pages/reviewDetail.html?id=${postId}`;
    }
};
window.addEventListener('load', async () => {
    if (id !== null) {
        const post = await getReviewDetail(id);
        const contentArray = post.content.split('@');
        movieTitle.textContent = contentArray[0];
        movieSubTitle.textContent = contentArray[1];
        textRating.textContent = contentArray[2];
        for (let rating of radioRating) {
            const ratingValue = rating.value;
            if (rating !== null && ratingValue === contentArray[2]) {
                rating.checked = true;
            }
        }
        textReview.textContent = contentArray[3];
        if (post.image) {
            if (post.image.includes('mandarin')) {
                imgContainer.classList.remove('disabled');
                imgReview.src = post.image;
            }
        }
        imgUrl = post.image;
    }
    loading.classList.add('disabled');
});
imgInput.addEventListener('change', (e) => {
    const fileReader = new FileReader();
    const target = e.currentTarget;
    const files = target.files;
    // 파일 선택 안 했을 때
    if (files === null) {
        return;
    }
    // 파일 타입이 이미지가 아닐 때
    if (!fileTypeArray.includes(files[0].type)) {
        alert('이미지 파일만 첨부 가능합니다.');
        return;
    }
    if (files[0].size > IMG_MAX_SIZE) {
        alert('10MB 미만의 이미지만 첨부 가능합니다.');
        return;
    }
    fileReader.readAsDataURL(files[0]);
    fileReader.addEventListener('load', () => {
        if (fileReader.result !== null) {
            imgContainer.classList.remove('disabled');
            img = files[0];
            imgReview.src = fileReader.result.toString();
            target.value = '';
        }
    });
});
closeButton.addEventListener('click', () => {
    img = undefined;
    imgUrl = '';
    imgReview.src = '';
    imgContainer.classList.add('disabled');
});
textReview.addEventListener('keydown', (e) => {
    setTextHeight(e);
});
textReview.addEventListener('keyup', (e) => {
    setTextHeight(e);
});
saveButton.addEventListener('click', (e) => {
    handleEditReview(e);
});
for (let rating of radioRating) {
    rating.addEventListener('click', () => {
        const ratingValue = rating.value;
        textRating.textContent = ratingValue;
    });
}
