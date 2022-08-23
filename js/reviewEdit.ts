import { handleUploadImage } from './imageApi.js';
import { getReviewDetail, editReview } from './reviewApi.js';

const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const id = params.get('id');

const movieTitle = document.querySelector(
    '#movie-title'
) as HTMLParagraphElement;
const movieSubTitle = document.querySelector(
    '#movie-title-eng'
) as HTMLParagraphElement;
const textRating = document.querySelector('#text-rating') as HTMLSpanElement;
const radioRating = document.querySelectorAll('.radio-rating');
const imgReview = document.querySelector('#img-review') as HTMLImageElement;
const imgInput = document.querySelector('#img-input') as HTMLInputElement;
const textReview = document.querySelector('#text-review') as HTMLInputElement;
const saveButton = document.querySelector('#btn-save') as HTMLButtonElement;

// 서버로 전송할 이미지 (파일 정보가 담김)
let img: File;
const IMG_MAX_SIZE = 10 * 1024 * 1024;
// 이미지 url
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

// 감상문 수정
const handleEditReview = async (e: Event) => {
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
    const postId = await editReview(id as string, reqData);
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
            const ratingValue = (rating as HTMLInputElement).value;
            if (rating !== null && ratingValue === contentArray[2]) {
                (rating as HTMLInputElement).checked = true;
            }
        }
        textReview.textContent = contentArray[3];
        imgReview.src = post.image;
        imgUrl = post.image;
    }
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
            imgReview.classList.remove('disabled');
            img = files[0];
            imgReview.src = fileReader.result.toString();
            target.value = '';
        }
    });
});

textReview.addEventListener('keydown', (e: Event) => {
    setTextHeight(e);
});

textReview.addEventListener('keyup', (e: Event) => {
    setTextHeight(e);
});

saveButton.addEventListener('click', (e: Event) => {
    handleEditReview(e);
});

for (let rating of radioRating) {
    rating.addEventListener('click', () => {
        const ratingValue = (rating as HTMLInputElement).value;
        textRating.textContent = ratingValue;
    });
}
