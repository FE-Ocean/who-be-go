//필요한 항목은 추가해서 사용하시면 됩니다.
export default interface MovieList {
    CollName: string;
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
