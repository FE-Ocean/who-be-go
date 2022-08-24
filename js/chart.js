// 공통 키값
const apiKey = '52ae81d6ce669361445e67ea47f30077'

// 01. 영화순위, 영화이름(한국), 개봉일, 코드 불러오기
const getMovieNameApi = async () => {
  let movieCode = []; // 여기서는 온전한 배열로 안보임.


  const today = '20220821'
  const items = '9'
  const reqUrl_01 = `https://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${apiKey}&targetDt=${today}&itemPerPage=${items}`

  const res = await fetch (reqUrl_01)
  if (res.status === 200) {
    const data = await res.json();
    console.log(data)
    let movieCharts = data.boxOfficeResult.dailyBoxOfficeList;
    // console.log(movieCharts)
    for(let movie of movieCharts){
      let movieObj = {
        "rank": "",
        "movieCodes": "",
        "title": "",
        "engTit": "",
        "openDate": "",
        "direc": "",
        "gen": "",
        "actor": "",
        "poster": "",
        "url": ""
      }
      // console.log(movie.movieCd)
      movieObj.rank = movie.rank;
      movieObj.movieCodes = movie.movieCd;
      movieObj.title = movie.movieNm;
      movieObj.openDate = movie.openDt
      // push 하기 전에 지금의 movieObj를 getMovieDetailApi의 인자로 넘겨서 나머지 정보를 받아온 후 최종 movieObj를 push합니다
      const result = await getMovieDetailApi(movieObj);
      // console.log(result)
      const result2 = await getMovieImgApi(movieObj);
      result.poster = result2.poster
      result.url = result2.url
      // result2.actor = result.actor
      result2.actorSearch = result.actorSearch
      movieCode.push(result);
    }
    // console.log(movieCode)

    // 영화 객체 배열 리턴
    return movieCode;
  } else {
    throw new Error('영화 순위 데이터안불러와짐')
  }
}

// 02. 01번에서 코드불러오면 -> 영화이름(영어), 감독이름, 출연진, 장르
const getMovieDetailApi = async (obj) => {
  // const movieNameApi = await getMovieNameApi(); 
  // const movieCode = "20211792";
  let movieObj = {...obj};
  const reqUrl_02 = `http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?key=${apiKey}&movieCd=${movieObj.movieCodes}`      
  const res = await fetch (reqUrl_02)
    if (res.status === 200) {
      const data = await res.json();
      let movieDatas = data.movieInfoResult.movieInfo;
      let movieCd = movieDatas.movieCd

      /**
      console.log(movieEns)
      console.log(movieNameApi[0].engTit)
      if (movieCd === codeNum){
        movieNameApi[i].engTit = movieDatas.movieNmEn;
        movieNameApi[i].direc = movieDatas.directors[0].peopleNm
        movieNameApi[i].gen = movieDatas.genres[0].genreNm
        movieNameApi[i].actor = 
          movieDatas.actors[0].peopleNm +','+ movieDatas.actors[1].peopleNm +','+ movieDatas.actors[2].peopleNm
      }
      */

      if (movieCd === movieObj.movieCodes){
        movieObj.engTit = movieDatas.movieNmEn;
        // 감독 배열이 없을 경우에는 안에 값을 넣어주지 않고 있을 때만 넣어주도록
        if(movieDatas.directors.length !== 0){
          movieObj.direc = movieDatas.directors[0].peopleNm
        }
        movieObj.gen = movieDatas.genres[0].genreNm
        movieObj.actor = 
          movieDatas.actors[0].peopleNm +' | '+ movieDatas.actors[1].peopleNm +' | '+ movieDatas.actors[2].peopleNm
        movieObj.actorSearch = movieDatas.actors[0].peopleNm
      }
      return movieObj;
    } else {
      throw new Error('영화 정보 안불러와짐')
    }
}

//03. 영화 이미지 불러오는 api
const getMovieImgApi = async (obj) => {
const apiKey_02 = 'NE98FTD75W4C0R4JS785'
let movieObj = {...obj}; // 얕은 복사
// let movieObj = JSON.parse(JSON.stringify(obj)); // 깊은복사
// let movieObj = Object.assign({}, obj)

let title = movieObj.title;
console.log(movieObj)
console.log(movieObj.rank)
console.log(movieObj.actorSearch)
let act = "-"
const reqUrl_03 = `https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?ServiceKey=${apiKey_02}&collection=kmdb_new2&title=${title}&actor=${act}&listCount=3`
const res = await fetch(reqUrl_03);

if (res.status === 200) {
  const data = await res.json();
  // console.log(data.Data[0].Result[0])
  let postImg = data.Data[0].Result[0].posters.split('|')[0]
  let postUrl = data.Data[0].Result[0].kmdbUrl
  movieObj.poster = postImg
  movieObj.url = postUrl
  return movieObj
  } else {
    throw new Error('영화 이미지 정보 안불러와짐')
  }

}


window.addEventListener("load", async () => {
  const movieList = await getMovieNameApi();
  // console.log(movieList);
  movieList.map(function(chart){
    const wrapperCard = document.querySelector(".wrapper-card.chart");
    const cardM = document.createElement('button');
    cardM.setAttribute('type','button');
    cardM.classList.add('card-m');
    cardM.setAttribute('id','chart-card-m');
    cardM.addEventListener('click', () => {
      location.href = `${chart.url}`
    })
    cardM.style.backgroundImage = `url('${chart.poster}')`;
      const ally = document.createElement('h2');
      ally.setAttribute('class','visually-hidden');
      ally.innerText = `${chart.rank}위 영화`
      const showContent = document.createElement('div');
      showContent.setAttribute('class','show-contents');
        const wrapMovTit = document.createElement('div');
        wrapMovTit.setAttribute('class','wrapper-movie-title');
          const movTit = document.createElement('strong');
          movTit.setAttribute('id','movie-title');
          movTit.innerText = `${chart.title}`;
          const movTitEng = document.createElement('span');
          movTitEng.setAttribute('id','movie-title-eng');
          movTitEng.innerText = `${chart.engTit}`;
        const cardHoverCont = document.createElement('ul');
        cardHoverCont.setAttribute('class','wrapper-sub-text');
          const subTitle_rel = document.createElement('li');
          subTitle_rel.setAttribute('class','sub-title');
          subTitle_rel.innerText = "Release";
            const textDate = document.createElement('strong')
            textDate.setAttribute('id','text-release');
            textDate.setAttribute('class','sub-text')
            // textDate.innerText = "2016.12.07";
            textDate.innerText = `${chart.openDate}`;

          const subTitle_direc = document.createElement('li');
          subTitle_direc.setAttribute('class','sub-title');
          subTitle_direc.innerText = "Director";
            const textDirec = document.createElement('strong')
            textDirec.setAttribute('id','text-director');
            textDirec.setAttribute('class','sub-text')
            textDirec.innerText = `${chart.direc}`;
          const subTitle_cast = document.createElement('li');
          subTitle_cast.setAttribute('class','sub-title');
          subTitle_cast.innerText = "Cast Actor";
            const textCast = document.createElement('strong')
            textCast.setAttribute('id','text-director');
            textCast.setAttribute('class','sub-text')
            textCast.innerText = `${chart.actor}`;
          const subTitle_gen = document.createElement('li');
          subTitle_gen.setAttribute('class','sub-title');
          subTitle_gen.innerText = "Genre";
            const textGen = document.createElement('strong')
            textGen.setAttribute('id','text-director');
            textGen.setAttribute('class','sub-text')
            textGen.innerText = `${chart.gen}`;
      wrapperCard.append(cardM)
      cardM.append(ally)
      cardM.append(showContent)
      showContent.append(wrapMovTit)
      wrapMovTit.append(movTit)
      wrapMovTit.append(movTitEng)
      showContent.append(cardHoverCont)
      cardHoverCont.append(subTitle_rel)
      subTitle_rel.append(textDate)
      cardHoverCont.append(subTitle_direc)
      subTitle_direc.append(textDirec)
      cardHoverCont.append(subTitle_cast)
      subTitle_cast.append(textCast)
      cardHoverCont.append(subTitle_gen)
      subTitle_gen.append(textGen)
  })
});




