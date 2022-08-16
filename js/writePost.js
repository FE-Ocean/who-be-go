var imgContainer = document.querySelector('.img-container');
var imgInput = document.querySelector('#img-input');
// 서버로 전송할 이미지 목록 (파일 정보가 담김)
var imgArray = [];
// 화면에 보여줄 이미지 목록 (파일의 로컬 경로가 담김)
var imgPreviewArray = [];
var setImage = function () {
    if (imgContainer !== null) {
        imgContainer.innerHTML = '';
        imgPreviewArray.map(function (src) {
            var image = document.createElement('img');
            image.src = src;
            imgContainer.append(image);
        });
    }
};
imgInput.addEventListener('change', function (e) {
    var fileReader = new FileReader();
    var target = e.currentTarget;
    var files = target.files;
    if (files === null) {
        return;
    }
    if (imgArray.length > 2) {
        alert('이미지 첨부는 최대 3개까지 가능합니다.');
    }
    else {
        fileReader.readAsDataURL(files[0]);
        fileReader.addEventListener('load', function () {
            imgArray.push(files[0]);
            if (fileReader.result !== null) {
                imgPreviewArray.push(fileReader.result.toString());
            }
            setImage();
        });
    }
    imgInput.value = '';
});
