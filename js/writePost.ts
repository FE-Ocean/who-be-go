const movieTitle = document.querySelector(
    '#movie-title'
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
const BASE_URL = 'https://mandarin.api.weniv.co.kr';
const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZjRmNjU0MTdhZTY2NjU4MWEzYWJlNiIsImV4cCI6MTY2NjA4Mjc2NywiaWF0IjoxNjYwODk4NzY3fQ.9mR2UQqnF8bBVLrwwgsqYQw2t5QK7ekw2uAo-jSVE8Y';

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

// 이미지 업로드
const handleUploadImage = async (image: File) => {
    const formData = new FormData();
    formData.append('image', image);
    const data = await fetch(BASE_URL + '/image/uploadfile', {
        method: 'POST',
        body: formData,
    });
    const result = await data.json();
    return `${BASE_URL}/${result.filename}`;
};

// 감상문 업로드
const handleUploadReview = async (e: Event) => {
    e.preventDefault();
    let imgUrl: String = '';
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
                textRating.textContent +
                '@' +
                textReview.value,
            image: imgUrl,
        },
    };
    await fetch(BASE_URL + '/post', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-type': 'application/json',
        },
        body: JSON.stringify(reqData),
    });
    window.location.href = '/pages/reviewDetail.html';
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
    handleUploadReview(e);
});

for (let rating of radioRating) {
    rating.addEventListener('click', () => {
        const ratingValue = (rating as HTMLInputElement).value;
        textRating.textContent = ratingValue;
    });
}
