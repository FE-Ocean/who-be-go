// import { MOVIE_URL } from './BASE_URL';

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

async function search() {
    const searchInput: string = (
        document.getElementById('input-search') as HTMLInputElement
    ).value;
    if (searchInput == '') {
        return;
    }
    const serviceKey = 'NE98FTD75W4C0R4JS785';
    const url = `https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&ServiceKey=${serviceKey}&detail=Y&listCount=17&title=${searchInput}`;
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
        const title = document.createElement('p');
        title.classList.add('searched-movie');
        searchedList?.appendChild(title);
        title.textContent = list.Result[i].title
            .replace(/\!HS/g, '')
            .replace(/\!HE/g, '')
            .replace(/^\s+|\s+$/g, '')
            .replace(/ +/g, ' ');
        title.addEventListener('click', () => {
            window.location.href = `../pages/searchResult.html?movieSeq=${list.Result[i].movieSeq}&movieId=${list.Result[i].movieId}`;
        });
    }
};
