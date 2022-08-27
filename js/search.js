"use strict";
// import { MOVIE_URL } from './BASE_URL';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const searchInput = document.getElementById('input-search');
const searchedList = document.querySelector('.container-searched-list');
function search(searchInputValue) {
    return __awaiter(this, void 0, void 0, function* () {
        const serviceKey = 'NE98FTD75W4C0R4JS785';
        const listCount = '100';
        const url = `https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&ServiceKey=${serviceKey}&detail=Y&sort=prodYear,1&listCount=${listCount}&title=${searchInputValue}`;
        try {
            const response = yield fetch(url, {
                method: 'GET',
            });
            const json = yield response.json();
            createSearchedList(json.Data[0]);
            console.log(json.Data[0]);
        }
        catch (err) {
            console.error(err);
        }
    });
}
const createSearchedList = (list) => {
    if (list.Result === undefined)
        return;
    searchedList.innerHTML = '';
    const gridBox = document.createElement('ol');
    const strong = document.createElement('strong');
    const fragment = document.createDocumentFragment();
    gridBox.classList.add('grid-box');
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
        gridBox.appendChild(li);
        li.appendChild(containerPoster);
        containerPoster.appendChild(posterImg);
        li.appendChild(div);
        div.appendChild(span);
        li.addEventListener('click', () => {
            window.location.href = `../pages/searchResult.html?movieSeq=${list.Result[i].movieSeq}&movieId=${list.Result[i].movieId}`;
        });
    }
    fragment.appendChild(strong);
    fragment.appendChild(gridBox);
    searchedList.appendChild(fragment);
};
searchInput === null || searchInput === void 0 ? void 0 : searchInput.addEventListener('keyup', (e) => {
    if (e.target instanceof HTMLInputElement) {
        if (e.target.value === '' || e.target.value.trim() === '') {
            searchedList.innerHTML = '';
            return;
        }
        search(e.target.value);
    }
});
