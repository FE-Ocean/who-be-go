import { handleUploadImage } from '../api/imageApi.js';
import { getMovieInfo } from '../api/movieApi.js';
import { writeReview } from '../api/reviewApi.js';
import { hasToken } from '../api/tokenValidApi.js';

hasToken();

const movieTitle = document.querySelector(
    '#movie-title'
) as HTMLParagraphElement;
const movieSubTitle = document.querySelector(
    '#movie-title-eng'
) as HTMLParagraphElement;
const textRating = document.querySelector('#text-rating') as HTMLSpanElement;
const radioRating = document.querySelectorAll('.radio-rating');
const imgContainer = document.querySelector('.img-container') as HTMLElement;
const imgReview = document.querySelector('#img-review') as HTMLImageElement;
const closeButton = document.querySelector('#btn-close') as HTMLButtonElement;
const imgInput = document.querySelector('#img-input') as HTMLInputElement;
const textReview = document.querySelector('#text-review') as HTMLInputElement;
const saveButton = document.querySelector('#btn-save') as HTMLButtonElement;
const loading = document.querySelector('.wrapper-etc') as HTMLElement;

const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const movieId = params.get('movieId');
const movieSeq = params.get('movieSeq');

// 서버로 전송할 이미지 (파일 정보가 담김)
let img: File | undefined;
const IMG_MAX_SIZE = 10 * 1024 * 1024;
let imgUrl: String = '';

const fileTypeArray: string[] = [
    'image/gif',
    'image/jpeg',
    'image/png',
    'image/bmp',
    'image/tiff',
    'image/heic',
];

const setTextHeight = (e: Event) => {
    const target = e.currentTarget as HTMLInputElement;
    target.style.height = textReview.scrollHeight + 'px';
    if (target.value.length > 0) {
        saveButton.classList.remove('disabled');
    } else {
        saveButton.classList.add('disabled');
    }
};

// 감상문 업로드
const handleUploadReview = async (e: Event) => {
    e.preventDefault();
    if (textRating.textContent === '') {
        alert('별점을 입력해주세요.');
        return;
    }
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
    const postId = await writeReview(reqData);
    window.location.href = `/pages/reviewDetail.html?id=${postId}`;
};

window.addEventListener('load', async () => {
    if (movieId !== null && movieSeq !== null) {
        const movieInfo = await getMovieInfo({
            movieId: movieId,
            movieSeq: movieSeq,
        });
        movieTitle.textContent = movieInfo.title;
        if (movieInfo.titleEng !== '') {
            movieSubTitle.textContent = movieInfo.titleEng;
        } else {
            movieSubTitle.textContent = movieInfo.titleOrg;
        }
        if (movieInfo.posters !== '') {
            imgUrl = movieInfo.posters.substring(0, 60);
        }
    }
    loading.classList.add('disabled');
});

imgInput.addEventListener('change', (e: Event) => {
    const fileReader = new FileReader();
    const target = e.currentTarget as HTMLInputElement;
    const files: FileList = target.files as FileList;
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
    imgReview.src = '';
    imgContainer.classList.add('disabled');
});

textReview.addEventListener('keydown', (e: Event) => {
    setTextHeight(e);
});

textReview.addEventListener('keyup', (e: Event) => {
    setTextHeight(e);
});

saveButton.addEventListener('click', (e: Event) => {
    handleUploadReview(e);
});

for (let rating of radioRating) {
    rating.addEventListener('click', () => {
        const ratingValue = (rating as HTMLInputElement).value;
        textRating.textContent = ratingValue;
    });
}
