"use strict";
const textRating = document.querySelector('#text-rating');
const radioRating = document.querySelectorAll('.radio-rating');
const imgReview = document.querySelector('#img-review');
const imgInput = document.querySelector('#img-input');
const textReview = document.querySelector('#text-review');
const saveButton = document.querySelector('#btn-save');
// 서버로 전송할 이미지 (파일 정보가 담김)
let img;
const IMG_MAX_SIZE = 10 * 1024 * 1024;
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
    }
    else {
        saveButton.classList.add('disabled');
    }
};
imgInput.addEventListener('change', (e) => {
    const fileReader = new FileReader();
    const target = e.currentTarget;
    const files = target.files;
    // 파일 선택 안 했을 때
    if (files === null) {
        return;
    }
    console.log(files[0].type);
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
            console.log(img);
            imgReview.src = fileReader.result.toString();
            target.value = '';
        }
    });
});
textReview.addEventListener('keydown', (e) => {
    setTextHeight(e);
});
textReview.addEventListener('keyup', (e) => {
    setTextHeight(e);
});
for (let rating of radioRating) {
    rating.addEventListener('click', () => {
        const ratingValue = rating.value;
        textRating.textContent = ratingValue;
    });
}
