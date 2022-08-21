const apiKey = '52ae81d6ce669361445e67ea47f30077'
const today = '20220820'
const items = '9'
const reqUrl = `https://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${apiKey}&targetDt=${today}&itemPerPage=${items}`

fetch(reqUrl)
  .then (response => response.json())
  .then (data => {
    let movieCharts = data.boxOfficeResult.dailyBoxOfficeList;
    console.log(data)
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

  })
  .catch (function(error) {
    console.log(error)
  }) 
  



