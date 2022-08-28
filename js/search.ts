import { getSearchResult } from './movieApi.js';
import MovieList from './movieListInterface.js';

const searchInput = document.getElementById('input-search') as HTMLInputElement;
const searchedList = document.querySelector(
    '.container-searched-list'
) as HTMLElement;

const gridBox = document.querySelector('.grid-box') as HTMLOListElement;
const strong = document.querySelector('strong') as HTMLElement;

let queryObj = {
    title: '',
    startCount: 0,
};

async function search(searchInputValue: string, startCount: number = 0) {
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

const createSearchedList = (list: MovieList, compare: boolean) => {
    if (list.Result === undefined) return;

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
            posterImg.setAttribute(
                'src',
                list.Result[i].posters.substring(0, 60)
            );
        } else {
            posterImg.setAttribute('src', '../assets/images/post_default.jpg');
        }
        posterImg.classList.add('img-poster');
        div.classList.add('title-box');
        span.classList.add('movie-title');

        const filteredTitle = list.Result[i].title
            .replace(/\!HS/g, '')
            .replace(/\!HE/g, '')
            .trim()
            .replace(/ +/g, ' ')
            .replace(
                searchInput.value,
                `<strong style="color:#FF5F5F">${searchInput.value}</strong>`
            );

        span.insertAdjacentHTML('afterbegin', filteredTitle);

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

searchInput?.addEventListener('keyup', (e) => {
    if (e.target instanceof HTMLInputElement) {
        if (e.target.value === '' || e.target.value.trim() === '') {
            gridBox.innerHTML = '';
            strong.textContent = '';
            return;
        }
        search(e.target.value);
    }
});

const createObserver = (element: Element) => {
    let startCount = 100;

    const observer = new IntersectionObserver(
        async ([entry], observer) => {
            if (entry.isIntersecting) {
                observer.unobserve(entry.target);
                let queryObj = {
                    title: searchInput.value,
                    startCount: startCount,
                };

                const newSearchList = await getSearchResult(queryObj);
                if (newSearchList.Result.length === 0) return;
                createSearchedList(newSearchList, true);
                if (
                    searchedList.lastElementChild?.lastElementChild instanceof
                    HTMLLIElement
                ) {
                    observer.observe(
                        searchedList.lastElementChild.lastElementChild
                    );
                }

                startCount += 100;

                if (newSearchList.Result.length < 100) {
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
