import { getSearchResult } from './movieApi.js';
const searchInput = document.getElementById('input-search');
const searchedList = document.querySelector('.container-searched-list');
const gridBox = document.querySelector('.grid-box');
const strong = document.querySelector('strong');
let queryObj = {
    title: '',
    startCount: 0,
};
let searchString = '';
async function search(searchInputValue, startCount = 0) {
    let compare = true;
    if (queryObj.title != searchInputValue) {
        compare = false;
    }
    queryObj.title = searchInputValue;
    queryObj.startCount = startCount;
    const searchResult = await getSearchResult(queryObj);
    searchString = searchInputValue;
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
    const result = list.Result.map((result) => {
        const newResult = Object.assign(Object.assign({}, result), { title: result.title
                .replace(/\!HS/g, '')
                .replace(/\!HE/g, '')
                .replace(/^\s+|\s+$/g, '')
                .replace(/ +/g, ' ') });
        return newResult;
    });
    // 영화 이름 완전 일치
    const allMatched = result.filter((movie) => movie.title.replace(/[ \!\,\.\?]/g, '') ===
        searchString.replace(/ /g, ''));
    // 부분 일치 (제목에 검색어를 포함하는 경우)
    const someMatched = result
        .filter((movie) => movie.title.replace(/[\!\,\.\?]/g, '') !== searchString)
        .filter((movie) => movie.title.replace(/[\!\,\.\?]/g, '').includes(searchString));
    // 불일치 (제목에 검색어를 포함하지 않는 경우)
    const notMatched = result
        .filter((movie) => movie.title.replace(/[\!\,\.\?]/g, '') !== searchString)
        .filter((movie) => !movie.title.replace(/[\!\,\.\?]/g, '').includes(searchString));
    // 최종 필터링 결과 (완전 일치 - 부분 일치 - 불일치 순)
    const orderedResult = allMatched.concat(someMatched, notMatched);
    for (let i = 0; i < orderedResult.length; i++) {
        const li = document.createElement('li');
        const containerPoster = document.createElement('div');
        const posterImg = document.createElement('img');
        const div = document.createElement('div');
        const span = document.createElement('span');
        li.classList.add('searched-movie');
        containerPoster.classList.add('container-poster');
        if (orderedResult[i].posters !== '') {
            posterImg.setAttribute('src', orderedResult[i].posters.substring(0, 60));
        }
        else {
            posterImg.setAttribute('src', '../assets/images/post_default.jpg');
        }
        posterImg.classList.add('img-poster');
        div.classList.add('title-box');
        span.classList.add('movie-title');
        const filteredTitle = orderedResult[i].title.replace(searchInput.value, `<strong style="color:#FF5F5F">${searchInput.value}</strong>`);
        span.insertAdjacentHTML('afterbegin', filteredTitle);
        fragment.appendChild(li);
        li.appendChild(containerPoster);
        containerPoster.appendChild(posterImg);
        li.appendChild(div);
        div.appendChild(span);
        li.addEventListener('click', () => {
            window.location.href = `../pages/searchResult.html?movieSeq=${orderedResult[i].movieSeq}&movieId=${orderedResult[i].movieId}`;
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
            searchString = searchInput.value;
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
