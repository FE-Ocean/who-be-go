"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const modalButton = document.querySelectorAll('.btn-modal');
const modalDropbox = document.querySelectorAll('.modal-dropbox');
// 영화 리스트 불러오기
const getReviewList = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // 로그인 구현되면 로컬스토리지에서 받아오는 형식으로 수정예정
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZmYyOTY3MTdhZTY2NjU4MWE1ZWYwMSIsImV4cCI6MTY2NjA3MzQ0NywiaWF0IjoxNjYwODg5NDQ3fQ.E6AKCeNOXPKQUdo8fkIaEsvUrl_bovHU6aFNgSw2jzU';
        const url = 'https://mandarin.api.weniv.co.kr/post/feocean/userpost';
        const response = yield fetch(url, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-type': 'application/json',
            },
        });
        const json = yield response.json();
        if (json.status === '404') {
            throw new Error('해당 계정이 존재하지 않습니다.');
        }
        else {
            setReviewList(json.post);
        }
    }
    catch (error) {
        console.error(error);
    }
});
getReviewList();
// 영화리뷰 리스트 저장하기
const setReviewList = (post) => {
    const listReview = document.querySelector('.list-review');
    const fragment = document.createDocumentFragment();
    if (post.length === 0) {
        // 리뷰가 0개일때 실행될 코드
    }
    else if (post.length === 1) {
        // 리뷰가 1개일때 실행될 코드
    }
    else if (post.length >= 2) {
        post.forEach((i) => {
            const li = document.createElement('li');
            const strong = document.createElement('strong');
            const details = document.createElement('details');
            const summary = document.createElement('summary');
            const imgMore = document.createElement('img');
            const divDropbox = document.createElement('div');
            const buttonEdit = document.createElement('button');
            const buttonDelete = document.createElement('button');
            const imgRating = document.createElement('img');
            const divWrapperPoster = document.createElement('div');
            const imgPoster = document.createElement('img');
            const p = document.createElement('p');
            const span = document.createElement('span');
            li.classList.add('item-review');
            strong.classList.add('movie-title');
            strong.textContent = '라라랜드';
            details.classList.add('details-movie');
            summary.classList.add('btn-modal');
            imgMore.setAttribute('src', '../assets/icons/icon-more-vertical.svg');
            imgMore.setAttribute('width', '25px');
            imgMore.setAttribute('height', '25px');
            imgMore.setAttribute('alt', '더보기버튼');
            divDropbox.classList.add('modal-dropbox');
            buttonEdit.classList.add('btn-dropbox');
            buttonEdit.setAttribute('id', 'btn-edit');
            buttonEdit.textContent = '수정';
            buttonDelete.classList.add('btn-dropbox');
            buttonDelete.setAttribute('id', 'btn-show-alert');
            buttonDelete.textContent = '삭제';
            imgRating.classList.add('img-rating');
            imgRating.setAttribute('src', '../assets/icons/star-yellow.svg');
            imgRating.setAttribute('alt', '영화별점');
            divWrapperPoster.classList.add('wrapper-poster');
            imgPoster.classList.add('img-poster');
            imgPoster.setAttribute('src', `${i.image}`);
            imgPoster.setAttribute('alt', '영화포스터');
            p.classList.add('text-story');
            p.textContent = `${i.content}`;
            span.classList.add('text-date');
            span.textContent = `${i.createdAt
                .slice(0, 11)
                .replace('-', '년 ')
                .replace('-', '월 ')
                .replace('T', '일')}`;
            summary.appendChild(imgMore);
            divDropbox.appendChild(buttonEdit);
            divDropbox.appendChild(buttonDelete);
            details.appendChild(summary);
            details.appendChild(divDropbox);
            divWrapperPoster.appendChild(imgPoster);
            li.appendChild(strong);
            li.appendChild(details);
            li.appendChild(imgRating);
            li.appendChild(divWrapperPoster);
            li.appendChild(p);
            li.appendChild(span);
            fragment.appendChild(li);
        });
        listReview === null || listReview === void 0 ? void 0 : listReview.appendChild(fragment);
    }
};
// 모달 버튼 클릭 시 드롭다운 나오게
modalButton.forEach((elem) => {
    if (elem instanceof HTMLElement) {
        elem === null || elem === void 0 ? void 0 : elem.addEventListener('click', (e) => {
            if (elem.nextElementSibling instanceof HTMLElement) {
                e.stopPropagation();
                console.log(elem.nextElementSibling.style.display);
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
