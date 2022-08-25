import { getMovieInfo } from './movieApi.js';

interface MovieLists {
    title: string;
    titleEng: string;
    posters: string;
    repRlsDate: string;
    prodYear: string;
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
        actor: [
            {
                actorNm: string;
            }
        ];
    };
    plots: {
        plot: [
            {
                plotText: string;
            }
        ];
    };
}

const title = document.querySelector('.movie-title') as HTMLHeadingElement;
const titleEng = document.querySelector(
    '.sub-movie-title'
) as HTMLHeadingElement;
const poster = document.querySelector('.poster-card') as HTMLImageElement;
const release = document.querySelector('.release');
const director = document.querySelector('.director');
const actor = document.querySelector('.actor');
const genre = document.querySelector('.genre');
const runtime = document.querySelector('.runtime');
const rating = document.querySelector('.rating');
const summary = document.querySelector('.movie-summary>dd') as HTMLElement;
const postReview = document.querySelector('.container-review-btn>button');
const movieSeq = window.location.search.slice(1);

postReview!.addEventListener('click', () => {
    window.location.href = `../pages/writePost.html?${movieSeq}`;
});

window.addEventListener('load', async () => {
    const movieInfo = await getMovieInfo(movieSeq);
    showValue(movieInfo);
});

const showValue = (movie: MovieLists) => {
    title.textContent = movie.title;
    titleEng.textContent = movie.titleEng;
    if (movie.posters !== '') {
        poster.src = movie.posters.substring(0, 60);
    } else {
        poster.src = '../assets/images/post_default.jpg';
    }
    if (movie.repRlsDate === '') {
        release!.textContent = movie.prodYear;
    } else {
        release!.textContent =
            movie.repRlsDate.slice(0, 4) +
            '.' +
            movie.repRlsDate.slice(4, 6) +
            '.' +
            movie.repRlsDate.slice(6);
    }
    director!.textContent = movie.directors.director[0].directorNm;

    let actorBox: string = '';
    for (let i = 0; i < 4; i++) {
        actorBox += movie.actors.actor[i].actorNm;
        actorBox += ' | ';
    }
    actor!.textContent = actorBox.slice(0, -2);

    genre!.textContent = movie.genre.replace(/,/g, ' | ');
    runtime!.textContent = movie.runtime + '분';
    rating!.textContent = movie.rating;
    if (movie.plots.plot[0].plotText === '') {
        summary.textContent = '줄거리가 제공되지 않습니다 :)';
    } else {
        summary.textContent = movie.plots.plot[0].plotText;
    }
};
