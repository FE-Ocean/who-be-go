const textRating = document.querySelector('#text-rating') as HTMLSpanElement;
const radioRating = document.querySelectorAll('.radio-rating');
const imgReview = document.querySelector('#img-review') as HTMLImageElement;
const imgInput = document.querySelector('#img-input') as HTMLInputElement;
const textReview = document.querySelector('#text-review') as HTMLInputElement;
const saveButton = document.querySelector('#btn-save') as HTMLButtonElement;

// 서버로 전송할 이미지 (파일 정보가 담김)
let img: File;

const fileTypeArray: string[] = [
    'img/gif',
    'image/jpeg',
    'image/png',
    'img/bmp',
    'img/tif',
    'img/heic',
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

textReview.addEventListener('keydown', (e: Event) => {
    setTextHeight(e);
});

textReview.addEventListener('keyup', (e: Event) => {
    setTextHeight(e);
});

for (let rating of radioRating) {
    rating.addEventListener('click', () => {
        const ratingValue = (rating as HTMLInputElement).value;
        textRating.textContent = ratingValue;
    });
}
