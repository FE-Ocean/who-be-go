import { getReviewList, deleteReview } from './reviewApi.js';
import PostInterface from './postInterface';
import { hasToken } from './tokenValid.js';

hasToken();

const noReview = document.querySelector('.wrapper-noreview') as HTMLElement;
const review = document.querySelector('.wrapper-review') as HTMLElement;
const writePostButton = document.getElementById('btn-writepost');
const modalAlertContainer = document.querySelectorAll(
    '.modal-alert-container'
)[1];
const ul = document.querySelector('.list-review');

writePostButton?.addEventListener('click', () => {
    location.href = '/pages/writePost.html';
});

// 삭제 버튼
const buttonDelete = document.querySelector('#btn-delete') as HTMLButtonElement;
let postId: string = '';

// 영화리뷰 리스트 저장하기
const setReviewList = (post: PostInterface[]) => {
    const listReview = document.querySelector('.list-review');
    const fragment = document.createDocumentFragment();

    if (post.length === 0) {
        // 리뷰가 0개일때 실행될 코드
        review.classList.add('disabled');
        noReview.classList.remove('disabled');
    } else {
        review.classList.remove('disabled');
        noReview.classList.add('disabled');
        for (let i of post) {
            const li = document.createElement('li');
            const strong = document.createElement('strong');
            // const details = document.createElement('details');
            // const summary = document.createElement('summary');
            const modalButton = document.createElement('button');
            const imgMore = document.createElement('img');
            const divDropbox = document.createElement('div');
            const buttonEdit = document.createElement('button');
            const buttonDelete = document.createElement('button');
            const imgRating = document.createElement('div');
            const divWrapperPoster = document.createElement('div');
            const imgPoster = document.createElement('img');
            const p = document.createElement('p');
            const span = document.createElement('span');

            const content = i.content.split('@');
            const movieTitle = content[0];
            const rating = content[2];
            const widthRating: string = (parseFloat(rating) / 5) * 100 + '%';
            const review = content[3];

            li.classList.add('item-review');
            strong.classList.add('movie-title');
            strong.textContent = movieTitle;
            strong.addEventListener('click', () => {
                window.location.href = `../pages/reviewDetail.html?id=${i.id}`;
            });
            // details.classList.add('details-movie');
            modalButton.classList.add('btn-modal');
            imgMore.setAttribute(
                'src',
                '../assets/icons/icon-more-vertical.svg'
            );
            imgMore.setAttribute('width', '25px');
            imgMore.setAttribute('height', '25px');
            imgMore.setAttribute('alt', '더보기버튼');
            imgMore.classList.add('ico-modal');
            divDropbox.classList.add('modal-dropbox', 'disabled');
            buttonEdit.classList.add('btn-dropbox');
            buttonEdit.setAttribute('id', 'btn-edit');
            buttonEdit.textContent = '수정';
            buttonEdit.addEventListener('click', () => {
                window.location.href = `../pages/reviewEdit.html?id=${i.id}`;
            });
            buttonDelete.classList.add('btn-dropbox');
            buttonDelete.setAttribute('id', 'btn-show-alert');
            buttonDelete.textContent = '삭제';
            buttonDelete.addEventListener('click', () => {
                postId = i.id;
                modalAlertContainer.classList.remove('disabled');
            });
            imgRating.classList.add('wrapper-rating');
            imgRating.style.setProperty('--width-rating', widthRating);
            divWrapperPoster.classList.add('wrapper-poster');
            imgPoster.classList.add('img-poster');
            if (
                i.image === '' ||
                i.image === 'https://mandarin.api.weniv.co.kr/undefined'
            ) {
                imgPoster.setAttribute(
                    'src',
                    '../assets/images/max_post_default.jpg'
                );
            } else {
                imgPoster.setAttribute('src', `${i.image}`);
            }
            imgPoster.setAttribute('alt', '리뷰 이미지');
            p.classList.add('text-story');
            p.textContent = `${review}`;
            span.classList.add('text-date');
            span.textContent = `${i.createdAt
                .slice(0, 11)
                .replace('-', '년 ')
                .replace('-', '월 ')
                .replace('T', '일')}`;

            modalButton.appendChild(imgMore);
            // 실제 클릭되는 것은 이미지이기 때문에 이미지에 이벤트리스너 달아줌
            imgMore.addEventListener('click', () => {
                divDropbox.classList.toggle('disabled');
            });
            divDropbox.appendChild(buttonEdit);
            divDropbox.appendChild(buttonDelete);
            // details.appendChild(summary);
            // details.appendChild(divDropbox);

            modalButton.appendChild(divDropbox);
            divWrapperPoster.appendChild(imgPoster);

            li.appendChild(strong);
            // li.appendChild(details);
            li.appendChild(modalButton);
            li.appendChild(imgRating);
            li.appendChild(divWrapperPoster);
            li.appendChild(p);
            li.appendChild(span);

            fragment.appendChild(li);
        }

        listReview?.appendChild(fragment);
    }
};

// 무한 스크롤
const createObserver = (element: Element) => {
    let skip = 10;

    const observer = new IntersectionObserver(
        async ([entry], observer) => {
            if (entry.isIntersecting) {
                observer.unobserve(entry.target);
                const newReviewList = await getReviewList(skip);

                setReviewList(newReviewList);
                if (ul?.lastElementChild instanceof HTMLLIElement) {
                    observer.observe(ul.lastElementChild);
                }

                skip += 10;

                if (newReviewList.length < 10) {
                    observer.disconnect();
                }
            }
        },
        {
            threshold: 0.5,
        }
    );

    if (element) {
        observer.observe(element);
    }
};

// 바깥 영역 클릭하면 모달 닫힘
window.addEventListener('click', (e: Event) => {
    // 문제는 이렇게 클릭 이벤트 실행될 때마다 쿼리셀렉터를 새로 불러와야 하는데 이게 맞는지?
    const modalDropbox = document.querySelectorAll('.modal-dropbox');
    const target = e.target as HTMLElement;
    if (!target.classList.contains('ico-modal')) {
        for (let dropbox of modalDropbox) {
            dropbox.classList.add('disabled');
        }
    }
});

// 모달 버튼 클릭 시 드롭다운 나오게
// modalButton.forEach((elem) => {
//     if (elem instanceof HTMLElement) {
//         elem?.addEventListener('click', (e) => {
//             if (elem.nextElementSibling instanceof HTMLElement) {
//                 e.stopPropagation();
//                 console.log(elem.nextElementSibling.style.display);
//                 elem.nextElementSibling.style.display = 'block';
//                 console.log(elem.nextElementSibling.style.display);
//             }
//         });
//     }
// });

// 바깥 영역 클릭시 모달 닫히게
// window.addEventListener('click', (e) => {
//     const target = e.target as HTMLElement;
//     console.log(target.className);
//     if (target.className === '') {
//         for (let elem of modalDropbox) {
//             console.log(elem);
//             if (elem instanceof HTMLElement) {
//                 elem.style.display = 'none';
//             }
//         }
//     }
// });

window.addEventListener('load', async () => {
    const reviewList = await getReviewList();
    setReviewList(reviewList);

    let lastItem = ul?.lastElementChild;
    if (lastItem instanceof HTMLLIElement) {
        createObserver(lastItem);
    }
});

buttonDelete.addEventListener('click', async () => {
    await deleteReview(postId);
    modalAlertContainer.classList.add('disabled');
    window.location.href = '../pages/review.html';
});
