const imgContainer = document.querySelector('.img-container');
const imgInput = document.querySelector('#img-input') as HTMLInputElement;

// 서버로 전송할 이미지 목록 (파일 정보가 담김)
let imgArray: File[] = [];
// 화면에 보여줄 이미지 목록 (파일의 로컬 경로가 담김)
let imgPreviewArray: string[] = [];

const fileTypeArray: string[] = [
    'img/gif',
    'image/jpeg',
    'image/png',
    'img/bmp',
    'img/tif',
    'img/heic',
];

// 저장 버튼을 누르기 전까지는 로컬 경로로 이미지를 보여줍니다.
// 사진을 일일이 서버에 올리고 그걸 다시 받아와서 보여주려면 느리기 때문에 저장 버튼을 눌렀을 때만 이미지를 서버로 전송합니다.
const setImage = () => {
    if (imgContainer !== null) {
        imgContainer.innerHTML = '';
        imgPreviewArray.map((src) => {
            const image = document.createElement('img');
            image.src = src;
            imgContainer.append(image);
        });
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
    // 이미지를 세 장 이상 첨부하려고 했을 때
    // 근데 왜 length가 2여야 작동하는지 모르겠음
    if (imgArray.length > 2) {
        alert('이미지 첨부는 최대 3개까지 가능합니다.');
        return;
    }
    fileReader.readAsDataURL(files[0]);
    fileReader.addEventListener('load', () => {
        imgArray.push(files[0]);
        if (fileReader.result !== null) {
            imgPreviewArray.push(fileReader.result.toString());
        }
        setImage();
    });
});
