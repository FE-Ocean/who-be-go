const wrapperCard = document.querySelector(".wrapper-card.chart");

    const cardM = document.createElement('article');
    cardM.setAttribute('class','card-m');
      const ally = document.createElement('h2');
      ally.setAttribute('class','visually-hidden');
      ally.innerText = [i+1]+"위 영화"
      const showContent = document.createElement('div');
      showContent.setAttribute('class','show-contents');
        const wrapMovTit = document.createElement('div');
        wrapMovTit.setAttribute('class','wrapper-movie-title');
          const movTit = document.createElement('strong');
          movTit.setAttribute('id','movie-title');
          movTit.innerText = "라라 랜드";
          const movTitEng = document.createElement('span');
          movTitEng.setAttribute('id','movie-title-eng');
          movTitEng.innerText = "LaLa Land";
        const cardHoverCont = document.createElement('ul');
        cardHoverCont.setAttribute('class','wrapper-sub-text');
          const subTitle = document.createElement('li');
          subTitle.setAttribute('class','sub-title');
          subTitle.innerText = "Release";
            const textRel = document.createElement('strong')
            textRel.setAttribute('id','text-release');
            textRel.setAttribute('class','sub-text')
            textRel.innerText = "2016.12.07";
