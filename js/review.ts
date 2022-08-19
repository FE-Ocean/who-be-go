const modalButton = document.querySelectorAll('.btn-modal');
const modalDropbox = document.querySelectorAll('.modal-dropbox');

// 모달 버튼 클릭 시 드롭다운 나오게
modalButton.forEach((elem) => {
    if (elem instanceof HTMLElement) {
        elem?.addEventListener('click', (e) => {
            if (elem.nextElementSibling instanceof HTMLElement) {
                e.stopPropagation();
                console.log(elem.nextElementSibling.style.display);
                console.log('클릭되는데');
                elem.nextElementSibling.style.display = 'block';
                console.log(elem.nextElementSibling.style.display);
            }
        });
    }
});

// 바깥 영역 클릭시 모달 닫히게
window.addEventListener('click', (e) => {
    modalDropbox.forEach((elem) => {
        if (elem instanceof HTMLElement) {
            elem.style.display = 'none';
        }
    });
});
