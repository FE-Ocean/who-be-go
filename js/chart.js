// 공통 키값
const apiKey = '52ae81d6ce669361445e67ea47f30077'
let movCode = new Array;
console.log(movCode)
// 01. 영화순위, 영화이름(한국), 개봉일, 코드 불러오기


const getMovieNameApi = async () => {
  const today = '20220821'
  const items = '9'
  const reqUrl_01 = `https://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${apiKey}&targetDt=${today}&itemPerPage=${items}`

  const res = await fetch (reqUrl_01)
  if (res.status === 200) {
    const data = await res.json();
    let movieCharts = data.boxOfficeResult.dailyBoxOfficeList
    movieCharts.map(function(chart){

      const wrapperCard = document.querySelector(".wrapper-card.chart");
      const cardM = document.createElement('button');
      cardM.setAttribute('type','button');
      cardM.classList.add('card-m');
      cardM.setAttribute('id','chart-card-m');
        const ally = document.createElement('h2');
        ally.setAttribute('class','visually-hidden');
        ally.innerText = `${chart.rank}위 영화`
        const showContent = document.createElement('div');
        showContent.setAttribute('class','show-contents');
          const wrapMovTit = document.createElement('div');
          wrapMovTit.setAttribute('class','wrapper-movie-title');
            const movTit = document.createElement('strong');
            movTit.setAttribute('id','movie-title');
            movTit.innerText = `${chart.movieNm}`;
            const movTitEng = document.createElement('span');
            movTitEng.setAttribute('id','movie-title-eng');
            movTitEng.innerText = "LaLa Land";
          const cardHoverCont = document.createElement('ul');
          cardHoverCont.setAttribute('class','wrapper-sub-text');
            const subTitle_rel = document.createElement('li');
            subTitle_rel.setAttribute('class','sub-title');
            subTitle_rel.innerText = "Release";
              const textDate = document.createElement('strong')
              textDate.setAttribute('id','text-release');
              textDate.setAttribute('class','sub-text')
              textDate.innerText = "2016.12.07";
            const subTitle_direc = document.createElement('li');
            subTitle_direc.setAttribute('class','sub-title');
            subTitle_direc.innerText = "Director";
              const textDirec = document.createElement('strong')
              textDirec.setAttribute('id','text-director');
              textDirec.setAttribute('class','sub-text')
              textDirec.innerText = "감독이름";
            const subTitle_cast = document.createElement('li');
            subTitle_cast.setAttribute('class','sub-title');
            subTitle_cast.innerText = "Cast";
              const textCast = document.createElement('strong')
              textCast.setAttribute('id','text-director');
              textCast.setAttribute('class','sub-text')
              textCast.innerText = "라이언 고슬링, 엠마 스톤";
            const subTitle_gen = document.createElement('li');
            subTitle_gen.setAttribute('class','sub-title');
            subTitle_gen.innerText = "Genre";
              const textGen = document.createElement('strong')
              textGen.setAttribute('id','text-director');
              textGen.setAttribute('class','sub-text')
              textGen.innerText = "로맨스, 뮤지컬, 드라마";
            const subTitle_rate = document.createElement('li');
            subTitle_rate.setAttribute('class','sub-title');
            subTitle_rate.innerText = "Rate";
              const textRate = document.createElement('strong')
              textRate.setAttribute('id','text-director');
              textRate.setAttribute('class','sub-text')
              textRate.innerText = "4.98 / 5";
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
        cardHoverCont.append(subTitle_rate)
        subTitle_rate.append(textRate)
    })
    movCode.push(movieCharts.movieCd)
    return movieCharts
    // 9개 배열 불러와짐
  } else {
    throw new Error('영화 순위 데이터안불러와짐')
  }
}

getMovieNameApi()
  .then((data) => {
    console.log(data)
    return 
  })


// 02. 01번에서 코드불러오면 -> 영화이름(영어), 감독이름, 출연진, 장르

const getMovieDetailApi = async () => {
  const movieCode = movCode[0]
  console.log(movieCode)
  const reqUrl_02 = `http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?key=${apiKey}&movieCd=${movieCode}`
  console.log(reqUrl_02);
  const res = await fetch (reqUrl_02)
  if (res.status === 200) {
    const data = await res.json();
    // const idnum = data.find((idnum) => idnum.movieInfoResult.movieInfo.movieCd === movieNameApi)

    return data.movieInfoResult.movieInfo
  } else {
    throw new Error('영화 정보 안불러와짐')
  }
}

getMovieDetailApi()
  .then((data) => {
  console.log(data)
  })

// 03. 남은거 - 영화포스터, 평점

// api 합치기
// const getMovie = async () => {
//   const movieNameApi = await getMovieNameApi()
//   const movieDetailApi = await getMovieDetailApi(movieNameApi)
  
//   return movieNameApi, movieDetailApi;
// }


