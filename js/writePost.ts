const imgContainer = document.querySelector('.img-container');
const imgInput = document.querySelector('#img-input') as HTMLInputElement;

// 서버로 전송할 이미지 목록 (파일 정보가 담김)
let imgArray: File[] = [];
// 화면에 보여줄 이미지 목록 (파일의 로컬 경로가 담김)
let imgPreviewArray: string[] = [];

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
    if (files === null) {
        return;
    }
    if (imgArray.length > 2) {
        alert('이미지 첨부는 최대 3개까지 가능합니다.');
    } else {
        fileReader.readAsDataURL(files[0]);
        fileReader.addEventListener('load', () => {
            imgArray.push(files[0]);
            if (fileReader.result !== null) {
                imgPreviewArray.push(fileReader.result.toString());
            }
            setImage();
        });
    }
    imgInput.value = '';
});
