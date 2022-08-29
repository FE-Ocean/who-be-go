import { handleUploadImage } from '../api/imageApi.js';
import { getIdValidMsg, getUserInfo, editUserInfo } from '../api/userApi.js';
const profileForm = document.querySelector('#form-profile');
const imgBtn = document.querySelector('#choose-img');
const profileImg = document.querySelector('#img-profile');
const name = document.querySelector('#name');
const id = document.querySelector('#user-id');
const intro = document.querySelector('#intro');
const errorName = document.querySelector('.msg-error.username');
const errorId = document.querySelector('.msg-error.userid');
const editBtn = document.querySelector('.btn-edit');
const loading = document.querySelector('.wrapper-etc');
const accountname = window.localStorage.getItem('accountname');
window.addEventListener('load', async () => {
    await getProfile();
    loading.classList.add('disabled');
});
// 현재 프로필 정보 get
async function getProfile() {
    const userInfo = await getUserInfo();
    profileImg.src = userInfo.image;
    name.value = userInfo.username;
    id.value = userInfo.accountname;
    intro.value = userInfo.intro;
}
// 버튼 활성화 함수
async function checkBtn() {
    const nameCheckedResult = checkNameValid(name.value);
    const idCheckedResult = await checkIdValid(id.value);
    if (nameCheckedResult && idCheckedResult) {
        editBtn.disabled = false;
    } else {
        editBtn.disabled = true;
    }
}
profileForm.addEventListener('input', () => {
    checkBtn();
});
// name 체크
function checkNameValid(name) {
    if (name == '') {
        errorName.textContent = '*사용자 이름은 필수 입력사항 입니다.';
        errorName.classList.remove('true');
        errorName.classList.add('false');
        return false;
    } else if (name.length < 2 || name.length > 11) {
        errorName.textContent = '*사용자 이름은 2~10자 이내여야 합니다.';
        errorName.classList.remove('true');
        errorName.classList.add('false');
        return false;
    } else {
        errorName.classList.remove('false');
        return true;
    }
}
// id 체크, 검증
async function checkIdValid(id) {
    try {
        const regex = /^[a-zA-Z0-9_.]{1,10}$/;
        if (id == '') {
            errorId.textContent = '*계정ID는 필수 입력사항 입니다.';
            errorId.classList.remove('true');
            errorId.classList.add('false');
            return false;
        } else if (!regex.test(id)) {
            errorId.textContent =
                '*영문, 숫자, 밑줄 및 마침표만 사용할 수 있습니다.';
            errorId.classList.remove('true');
            errorId.classList.add('false');
            return false;
        } else if (id === accountname) {
            errorId.classList.remove('true');
            errorId.classList.remove('false');
            return true;
        }
        const idData = {
            user: {
                accountname: id,
            },
        };
        const resMsg = await getIdValidMsg(idData);
        if (resMsg === '사용 가능한 계정ID 입니다.') {
            errorId.textContent = '*' + resMsg;
            errorId.classList.remove('false');
            errorId.classList.add('true');
            return true;
        } else if (resMsg === '이미 가입된 계정ID 입니다.') {
            errorId.textContent = '*' + resMsg;
            errorId.classList.remove('true');
            errorId.classList.add('false');
            return false;
        }
    } catch (err) {
        console.error(err);
    }
}
// 이미지 업로드
async function uploadImg(e) {
    try {
        const target = e.target;
        if (target.files !== null) {
            const file = target.files[0];
            const editImgURL = await handleUploadImage(file);
            profileImg.src = editImgURL;
        }
    } catch (err) {
        console.error(err);
    }
}
imgBtn.addEventListener('change', (e) => {
    uploadImg(e);
});
// 수정한 유저 정보 put 요청
async function editProfile(e) {
    e.preventDefault();
    const reqData = {
        user: {
            username: name.value,
            accountname: id.value,
            intro: intro.value,
            image: profileImg.src,
        },
    };
    const editInfo = await editUserInfo(reqData);
    if (editInfo) {
        localStorage.setItem('accountname', editInfo.accountname);
        location.href = './myPage.html';
    }
}
editBtn.addEventListener('click', (e) => {
    editProfile(e);
});
