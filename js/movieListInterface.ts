//필요한 항목은 추가해서 사용하시면 됩니다.
export default interface MovieList {
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

export interface BoxOffice {
    audiAcc: string;
    audiChange: string;
    audiCnt: string;
    audiInten: string;
    movieCd: string;
    movieNm: string;
    openDt: string;
    rank: string;
    rankInten: string;
    rankOldAndNew: string;
    rnum: string;
    salesAcc: string;
    salesAmt: string;
    salesChange: string;
    salesInten: string;
    salesShare: string;
    scrnCnt: string;
    showCnt: string;
}

export interface Director {
    directorNm: string;
    directorEnNm: string;
    directorId: string;
}

export interface Directors {
    director: Director[];
}

export interface Actor {
    actorNm: string;
    actorEnNm: string;
    actorId: string;
}

export interface Actors {
    actor: Actor[];
}

export interface Plot {
    plotLang: string;
    plotText: string;
}

export interface Plots {
    plot: Plot[];
}

export interface Rating {
    ratingMain: string;
    ratingDate: string;
    ratingNo: string;
    ratingGrade: string;
    releaseDate: string;
    runtime: string;
}

export interface Ratings {
    rating: Rating[];
}

export interface MovieDetail {
    DOCID: string;
    movieId: string;
    movieSeq: string;
    title: string;
    titleEng: string;
    titleOrg: string;
    titleEtc: string;
    prodYear: string;
    directors: Directors;
    actors: Actors;
    nation: string;
    plots: Plots;
    runtime: string;
    rating: string;
    genre: string;
    kmdbUrl: string;
    type: string;
    use: string;
    episodes: string;
    repRatDate: string;
    repRlsDate: string;
    ratings: Ratings;
    keywords: string;
    posters: string;
    stlls: string;
    regDate: string;
    modDate: string;
    ALIAS: string;
}
