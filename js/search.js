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
        const url = `https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&ServiceKey=${serviceKey}&detail=Y&listCount=17&title=${searchInputValue}`;
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
    for (let i = 0; i < list.Result.length; i++) {
        const title = document.createElement('p');
        title.classList.add('searched-movie');
        searchedList === null || searchedList === void 0 ? void 0 : searchedList.appendChild(title);
        title.textContent = list.Result[i].title
            .replace(/\!HS/g, '')
            .replace(/\!HE/g, '')
            .replace(/^\s+|\s+$/g, '')
            .replace(/ +/g, ' ');
        // DocumentFragment 수정 필요
        title.addEventListener('click', () => {
            window.location.href = `../pages/searchResult.html?movieSeq=${list.Result[i].movieSeq}&movieId=${list.Result[i].movieId}`;
        });
    }
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
