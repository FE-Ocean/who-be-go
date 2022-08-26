// import { MOVIE_URL } from './BASE_URL';

const searchInput = document.getElementById('input-search');
const searchedList = document.querySelector(
    '.container-searched-list'
) as HTMLElement;

interface MovieList {
    CollName: string;
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
    const serviceKey = 'NE98FTD75W4C0R4JS785';
    const url = `https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&ServiceKey=${serviceKey}&detail=Y&listCount=17&title=${searchInputValue}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
        });
        const json = await response.json();
        createSearchedList(json.Data[0]);
        console.log(json.Data[0]);
    } catch (err) {
        console.error(err);
    }
}

const createSearchedList = (list: MovieList) => {
    if (list.Result === undefined) return;
    searchedList.innerHTML = '';
    for (let i = 0; i < list.Result.length; i++) {
        const title = document.createElement('p');
        title.classList.add('searched-movie');
        searchedList?.appendChild(title);
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

searchInput?.addEventListener('keyup', (e) => {
    if (e.target instanceof HTMLInputElement) {
        if (e.target.value === '' || e.target.value.trim() === '') {
            searchedList.innerHTML = '';
            return;
        }
        search(e.target.value);
    }
});
