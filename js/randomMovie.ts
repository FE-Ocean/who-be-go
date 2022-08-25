import { MOVIE_URL } from './BASE_URL.js';
import data from './randomMovieList.js';
interface MovieLists {
    title: string;
    titleOrg: string;
    titleEng: string;
    posters: string;
    repRlsDate: string;
    genre: string;
    rating: string;
    directors: {
        director: [
            {
                directorNm: string;
            }
        ];
    };
    actors: {
        actor: [
            {
                actorNm: string;
            }
        ];
    };
}

const titleKo = document.querySelector('#movie-title') as HTMLElement;
const titleEng = document.querySelector('#movie-title-eng') as HTMLElement;
const relase = document.querySelector('#release') as HTMLElement;
const director = document.querySelector('#director') as HTMLElement;
const actors = document.querySelector('#actor') as HTMLElement;
const genre = document.querySelector('#genre') as HTMLElement;
const rating = document.querySelector('#rating') as HTMLElement;
const img = document.querySelector('.card-L') as HTMLImageElement;
const imgInfo = document.querySelector('.card-L.info') as HTMLImageElement;
const newBtn = document.querySelector('.btn-L.home') as HTMLButtonElement;

//숫자 랜덤으로 뽑아주는 함수
function rand(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const id = data[rand(0, 98)];
const title: string = id.title;
const movieSeq: string = id.movieSeq;
const serviceKey: string = 'NE98FTD75W4C0R4JS785';

//영화 정보
async function getMovieInfo() {
    const url =
        MOVIE_URL +
        `&detail=Y&title=${title}&movieSeq=${movieSeq}&ServiceKey=${serviceKey}`;

    console.log(url);

    try {
        const response = await fetch(url, {
            method: 'GET',
        });
        const reqJson = await response.json();
        const result = await reqJson.Data[0].Result[0];
        setValue(result);
    } catch (err) {
        console.error(err);
    }
}

window.addEventListener('load', async () => {
    await getMovieInfo();
});

const setValue = (result: MovieLists) => {
    function posterUrl(posters: string) {
        const poster = result.posters;
        if (poster.includes('|')) {
            return poster.split('|')[0];
        } else {
            return poster;
        }
    }
    const title = result.title
        .replace(/\!HS/g, '')
        .replace(/\s+\!HE+\s/g, '')
        .replace(/ +/g, ' ')
        .replace(/^\s+|\s+$/g, '');

    titleKo!.textContent = title;
    titleEng!.textContent = result.titleEng || result.titleOrg;
    relase!.textContent = `${result.repRlsDate.slice(
        0,
        4
    )}.${result.repRlsDate.slice(4, 6)}.${result.repRlsDate.slice(6, 8)}`;
    director!.textContent = result.directors.director[0].directorNm;

    let actorBox: string = '';
    for (let i = 0; i < 3; i++) {
        actorBox += result.actors.actor[i].actorNm;
        actorBox += ' | ';
    }
    actors!.textContent = actorBox.slice(0, -2);

    let newGenres: string = result.genre.split(',').join(' | ');
    genre!.textContent = newGenres;

    rating!.textContent = result.rating;
    img!.style.backgroundImage = "url('" + posterUrl(result.posters) + "')";
    imgInfo!.style.backgroundImage = "url('" + posterUrl(result.posters) + "')";
};

//새로운 영화 추천 버튼
function refreshPage() {
    window.location.reload();
}
newBtn.addEventListener('click', refreshPage);
