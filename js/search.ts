import { getSearchResult } from './movieApi.js';

const searchInput = document.getElementById('input-search');
const searchedList = document.querySelector(
    '.container-searched-list'
) as HTMLElement;

interface MovieList {
    TotalCount: string;
    Result: [
        {
            movieSeq: string;
            movieId: string;
            title: string;
            titleEng: string;
            posters: string;
            genre: string;
            rating: string;
            runtime: string;
            directors: {
                director: [
                    {
                        directorNm: string;
                    }
                ];
            };
            actors: {
                actor: [];
            };
        }
    ];
}

async function search(searchInputValue: string) {
    const searchResult = await getSearchResult(searchInputValue);
    createSearchedList(searchResult);
}

const createSearchedList = (list: MovieList) => {
    if (list.Result === undefined) return;
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
            posterImg.setAttribute(
                'src',
                list.Result[i].posters.substring(0, 60)
            );
        } else {
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

searchInput?.addEventListener('keyup', (e) => {
    if (e.target instanceof HTMLInputElement) {
        if (e.target.value === '' || e.target.value.trim() === '') {
            searchedList.innerHTML = '';
            return;
        }
        search(e.target.value);
    }
});
