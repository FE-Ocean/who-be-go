import { BoxOffice, MovieDetail } from './movieListInterface';
import { getBoxOfficeList } from './boxOfiiceApi.js';
import { getMovieInfo } from './movieApi.js';
const loadingItem = document.querySelectorAll('.loading');
// 일별 박스 오피스 값을 넣어 영화 상세 결과값을 얻어냅니다.
const movieDetail = async (boxOfficeResult: BoxOffice[]) => {
    boxOfficeResult.forEach(async (movie) => {
        let detailResult;
        const title = movie.movieNm.replace(/ /g, '');

        const releaseDts = movie.openDt.replace(/-/gi, '');
        detailResult = await getMovieInfo({
            title: title,
            releaseDts: releaseDts,
        });
        // 만약 검색한 결과 값이 없을 경우 검색 조건을 바꿔서 한번 더 검색합니다.
        if (detailResult.TotalCount === 0) {
            detailResult = await getMovieInfo({
                title: title,
                releaseDte: releaseDts,
            });
        }
        setMovieDetail(movie, detailResult);
    });
};
// 영화정보를 셋팅합니다.
const setMovieDetail = async (movie: BoxOffice, detailResult: MovieDetail) => {
    const li = document.getElementById(`rank${movie.rank}`);
    if (li instanceof HTMLLIElement) {
        li.style.backgroundImage = `url(${detailResult.posters.split('|')[0]})`;
        li.addEventListener('click', () => {
            location.href = `../pages/searchResult.html?movieId=${detailResult.movieId}&movieSeq=${detailResult.movieSeq}`;
        });
        const movieTitle = li.querySelector('#movie-title');
        const movieEngTitle = li.querySelector('#movie-title-eng');
        const textRelease = li.querySelector('#text-release');
        const textDirector = li.querySelector('#text-director');
        const textActor = li.querySelector('#text-actor');
        const textGenre = li.querySelector('#text-genre');
        if (movieTitle instanceof HTMLElement) {
            movieTitle.textContent = `${movie.movieNm}`;
        }
        if (movieEngTitle instanceof HTMLSpanElement) {
            movieEngTitle.textContent = `${detailResult.titleEng}`;
        }
        if (textRelease instanceof HTMLElement) {
            if (movie.openDt !== '') {
                const dates = movie.openDt;
                let dateText = '';
                for (let date of dates) {
                    dateText += date.split('-').join('.');
                }
                textRelease.textContent = `${dateText}`;
            } else {
                textRelease.textContent = '정보 없음';
            }
        }
        if (textDirector instanceof HTMLElement) {
            if (detailResult.directors.director[0].directorNm !== '') {
                textDirector.textContent = `${detailResult.directors.director[0].directorNm}`;
            } else {
                textDirector.textContent = '정보 없음';
            }
        }
        if (textActor instanceof HTMLElement) {
            const actors = detailResult.actors.actor;
            if (actors[0].actorNm !== '') {
                let actorText = '';
                for (let actor of actors) {
                    actorText += actor.actorNm + ' | ';
                }
                textActor.textContent = `${actorText}`;
            } else {
                textActor.textContent = '정보 없음';
            }
        }
        if (textGenre instanceof HTMLElement) {
            const genres = detailResult.genre;
            if (genres !== '') {
                let genreText = '';
                for (let genre of genres) {
                    genreText += genre.split(',').join(' | ');
                }
                textGenre.textContent = `${genreText}`;
            } else {
                textGenre.textContent = '정보 없음';
            }
        }
    }
};
const hideLoading = () => {
    loadingItem.forEach((element) => {
        element.classList.remove('loading');
    });
};
window.addEventListener('load', async () => {
    const results = await getBoxOfficeList();
    movieDetail(results);
    hideLoading();
});
