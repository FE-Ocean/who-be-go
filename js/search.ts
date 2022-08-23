// import { MOVIE_URL } from './BASE_URL';

interface MovieList {
    // CollName: string;
    Result: [
        {
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

async function search() {
    const searchInput: string = (
        document.getElementById('input-search') as HTMLInputElement
    ).value;
    const url = `https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&ServiceKey=&detail=Y&listCount=10&title=${searchInput}`;
    console.log('인풋', searchInput);
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
    const searchedList = document.querySelector(
        '.container-searched-list'
    ) as HTMLElement;

    searchedList.innerHTML = '';
    for (let i = 0; i < list.Result.length; i++) {
        // if (!searchedList) {
        //     searchedList.innerHTML = '';
        // }
        const title = document.createElement('p');
        searchedList?.appendChild(title);
        title.textContent = list.Result[i].title;
        title.addEventListener('click', () => {
            window.location.href = '../pages/searchResult.html';
        });
    }
};
