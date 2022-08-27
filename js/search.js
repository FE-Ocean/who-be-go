import { getSearchResult } from './movieApi.js';
const searchInput = document.getElementById('input-search');
const searchedList = document.querySelector('.container-searched-list');
const gridBox = document.querySelector('.grid-box');
const strong = document.querySelector('strong');
let queryObj = {
    title: '',
    startCount: 0,
};
async function search(searchInputValue, startCount = 0) {
    let compare = true;
    if (queryObj.title != searchInputValue) {
        compare = false;
    }
    queryObj.title = searchInputValue;
    queryObj.startCount = startCount;
    const searchResult = await getSearchResult(queryObj);
    createSearchedList(searchResult, compare);
    if (gridBox.lastElementChild instanceof HTMLLIElement) {
        createObserver(gridBox.lastElementChild);
    }
}
const createSearchedList = (list, compare) => {
    if (list.Result === undefined)
        return;
    if (!compare) {
        gridBox.innerHTML = '';
    }
    const fragment = document.createDocumentFragment();
    strong.textContent = `총 ${list.TotalCount}개의 검색결과가 있습니다.`;
    for (let i = 0; i < list.Result.length; i++) {
        const li = document.createElement('li');
        const containerPoster = document.createElement('div');
        const posterImg = document.createElement('img');
        const div = document.createElement('div');
        const span = document.createElement('span');
        li.classList.add('searched-movie');
        containerPoster.classList.add('container-poster');
        if (list.Result[i].posters !== '') {
            posterImg.setAttribute('src', list.Result[i].posters.substring(0, 60));
        }
        else {
            posterImg.setAttribute('src', '../assets/images/post_default.jpg');
        }
        posterImg.classList.add('img-poster');
        div.classList.add('title-box'); //말줄임 때문에 씀
        span.classList.add('movie-title');
        span.textContent = list.Result[i].title
            .replace(/\!HS/g, '')
            .replace(/\!HE/g, '')
            .replace(/^\s+|\s+$/g, '')
            .replace(/ +/g, ' ');
        fragment.appendChild(li);
        li.appendChild(containerPoster);
        containerPoster.appendChild(posterImg);
        li.appendChild(div);
        div.appendChild(span);
        li.addEventListener('click', () => {
            window.location.href = `../pages/searchResult.html?movieSeq=${list.Result[i].movieSeq}&movieId=${list.Result[i].movieId}`;
        });
    }
    gridBox.appendChild(fragment);
};
searchInput === null || searchInput === void 0 ? void 0 : searchInput.addEventListener('keyup', (e) => {
    if (e.target instanceof HTMLInputElement) {
        if (e.target.value === '' || e.target.value.trim() === '') {
            gridBox.innerHTML = '';
            strong.textContent = '';
            return;
        }
        search(e.target.value);
    }
});
// '한' 이라는 한글자를 검색했을 때 총 696개의 검색결과
// 현재 listcount 값을 100개로 제한한 상태여서 596개의 결과 확인 불가능
// listcount는 최대 500개까지만 늘릴 수 있으므로 최대로 늘려도 196개의 검색 결과 확인 불가능
// 무한스크롤
const createObserver = (element) => {
    let startCount = 100;
    const observer = new IntersectionObserver(async ([entry], observer) => {
        var _a;
        if (entry.isIntersecting) {
            observer.unobserve(entry.target);
            let queryObj = {
                title: searchInput.value,
                startCount: startCount,
            };
            const newSearchList = await getSearchResult(queryObj);
            if (newSearchList.Result.length === 0)
                return;
            createSearchedList(newSearchList, true);
            if (((_a = searchedList.lastElementChild) === null || _a === void 0 ? void 0 : _a.lastElementChild) instanceof
                HTMLLIElement) {
                observer.observe(searchedList.lastElementChild.lastElementChild);
            }
            startCount += 100;
            if (newSearchList.Result.length < 100) {
                observer.disconnect();
            }
        }
    }, {
        threshold: 0.5,
    });
    if (element) {
        observer.observe(element);
    }
};
