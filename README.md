<h1>🎬 후비고 | 나만의 영화 감상 기록 앱</h1>

-   프로젝트 기간 : 2022.8.10 ~ 2022.8.28

-   배포 URL : https://who-be-go.netlify.app/
    -   ID : whobego@feocean.com
    -   PassWord : feocean

<br>
<div align="center">
<img src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/36322f3e-4f86-4e4e-a887-645209468608/mockup.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220829%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220829T065850Z&X-Amz-Expires=86400&X-Amz-Signature=04296e13ec275c34bff5b542d0eaf8d7c2f2d139afdb7f335d692912f99bac2c&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22mockup.png%22&x-id=GetObject">
</div>
<br>

<div align="center">
<h1>🎬 개요</h1>
</div>

```
🎬 ’후비고'는 ‘후기 무비 고'의 줄임말로 나만의 영화 감상문 기록 서비스입니다.

🍿 영화 랜덤 추천 및 일별 박스오피스 순위 정보를 제공합니다.

⭐️ 영화 검색 및 상세 정보를 제공하며 감상문 작성시 나의 별점을 기록할 수 있습니다.

🖋 후비고를 통해 내가 본 영화를 기록해보세요! 후비고 ~ 💫
```

<br>

<div align="center">

<h1>⚙️ 개발 환경 및 배포 URL</h1>
  
</div>

### [기술]

-   FrontEnd: TypeScript, SCSS
    <br/>
-   BackEnd: 제공된 API , 영화진흥위원회 API , 한국영화자료원 API
    <br/>

❗️
`Internet Explorer` 에서는 제대로 동작하지 않습니다. 타 브라우저 사용을 권장합니다.

</br>

### [개발 환경]

-   GitHub : [후비고 GitHub](https://github.com/FE-Ocean/who-be-go) | [후비고 Project Log](https://github.com/orgs/FE-Ocean/projects/1)
    <br/>
-   WorkPlace: [후비고 Notion](https://plant-light-56b.notion.site/d7b3b70671404b40bd72eb248b3435e6)
    <br/>
-   Design : [후비고 Figma](https://www.figma.com/file/H78zxILOvjmoVhomyVUOqI/%ED%9B%84%EB%B9%84%EA%B3%A0?node-id=0%3A1)
    <br/>
-   Conference: GatherTown | Discord

</br>

### [배포 URL]

-   URL: [https://who-be-go.netlify.app/](https://who-be-go.netlify.app/)
-   계정
    -   🧑🏻‍💻 `ID`: whobego@feocean.com
    -   🔐 `PassWord`: feocean

</br>
</br>

<div align="center">
<h1>⚙️ 구현 기능</h1>
</div>

```
- 🔐 인증
    - 로그인
    - 회원가입
    - 프로필 설정
    - 프로필 수정
    - 유효성 검사
- 🎬 영화 서비스
    - 랜덤 추천
    - 일별 박스오피스 순위
    - 영화 검색 및 상세정보
- 📝 감상문
    - 영화 별점
    - 감상문 작성
    - 감상문 수정
    - 감상문 삭제

```

<br>
<div align="center">
<h1>🚀 역할 분담</h1>
</div>

## **👩🏻‍💻 이수빈**

-   프로젝트 초기 세팅
-   UI 디자인 / 피그마 작업
-   🖍 **UI** :
    Component 모듈화,
    회원가입, 프로필 설정, 영화 랜덤 추천, 영화 차트,<br>
    마이페이지, 로딩중/404 페이지, 반응형 대응, 파비콘
-   🛠 **기능 구현** :
    회원가입, 영화 랜덤 추천

<br>

## **👩🏻‍💻 이혜원**

-   🖍 **UI** :
    모달, 영화 감상문 등록 페이지
-   🛠 **기능 구현** :
    모달, 드롭다운, 사용자 프로필 페이지, 영화 감상문 작성, 등록, 수정, 삭제
    <br>감상문 별점 기능, 로그아웃, api 함수 개별 분리

<br>

## **👩🏻‍💻 이소민**

-   🖍 **UI** : 헤더 푸터, 로그인, 프로필 수정
-   🛠 **기능 구현** : 헤더, 로그인, 프로필 설정, 수정

<br>

## **👩🏻‍💻 임수진**

-   🖍 **UI** : 영화 검색, 영화 검색 결과
-   **🛠 기능 구현** : 영화 검색, 영화 검색 결과

<br>

## **🧑🏻‍💻 이현섭**

-   **🖍 UI** : 감상문 모아보기, 감상문 상세 페이지
-   **🛠 기능 구현** : 감상문 모아보기, 감상문 상세 페이지, 토큰 검증, 무한 스크롤, 404 페이지

<br>

## **🧑🏻‍💻 류재준**

-   **🖍 UI** : 초기 와이어프레임 세팅
-   **🛠 기능 구현** : 영화 차트 카드 클릭시 상세 페이지 이동 기능

<br>

<div align="center">

<h1>🧑🏻‍💻 구현 UI</h1>
  
</div>

<div >

|                            0. 로그인                            |                           1. 로그아웃                            |
| :-------------------------------------------------------------: | :--------------------------------------------------------------: |
| <img src="https://i.esdrop.com/d/f/eZ1kpS3Y3y/eSEjbHAt4t.gif"/> | <img src="https://i.esdrop.com/d/f/eZ1kpS3Y3y/LtvBoNbWMd.gif" /> |

|                           2. 회원가입                           |                          3. 프로필설정                          |
| :-------------------------------------------------------------: | :-------------------------------------------------------------: |
| <img src="https://i.esdrop.com/d/f/eZ1kpS3Y3y/fIhSJuGHs0.gif"/> | <img src="https://i.esdrop.com/d/f/eZ1kpS3Y3y/2r1xlXkO6U.gif"/> |

|                        4. 영화 랜덤 추천                        |                     5. 일별 박스오피스 순위                     |
| :-------------------------------------------------------------: | :-------------------------------------------------------------: |
| <img src="https://i.esdrop.com/d/f/eZ1kpS3Y3y/zlcypS4XMN.gif"/> | <img src="https://i.esdrop.com/d/f/eZ1kpS3Y3y/ooVl0mOyg8.gif"/> |

|                      6. 영화 검색 및 결과                       |                         7. 감상문 작성                          |
| :-------------------------------------------------------------: | :-------------------------------------------------------------: |
| <img src="https://i.esdrop.com/d/f/eZ1kpS3Y3y/DCyiXAx7C5.gif"/> | <img src="https://i.esdrop.com/d/f/eZ1kpS3Y3y/Uw7RP3wiGQ.gif"/> |

|                     8. 감상문 수정 및 삭제                      |                          9. 마이페이지                          |
| :-------------------------------------------------------------: | :-------------------------------------------------------------: |
| <img src="https://i.esdrop.com/d/f/eZ1kpS3Y3y/FAR9v67EUI.gif"/> | <img src="https://i.esdrop.com/d/f/eZ1kpS3Y3y/X1OEK4oIrF.gif"/> |

<br>

<div align="center">

<h1>🗂 폴더 트리</h1>
  
</div>

<br>

```
📦who-be-go
 ┣ 📂assets
 ┃ ┣ 📂icons
 ┃ ┗ 📂images
 ┣ 📂html
 ┣ 📂js
 ┃ ┣ 📂api
 ┃ ┣ 📂interface
 ┃ ┣ 📂pages
 ┃ ┗ 📂url
 ┣ 📂pages
 ┣ 📂styles
 ┃ ┣ 📂base
 ┃ ┣ 📂components
 ┃ ┣ 📂constants
 ┃ ┗ 📂pages
 ┃ ┣ 📃main.css
 ┃ ┗ 📃main.scss
 ┣ ⭐️favicon.ico
 ┣ 📃index.html
 ┣ 📃README.md
 ┗ 📃tsconfig.json
```

<br>

<div align="center">

<h1>🖤 팀원 소개 🖤</h1>
  
</div>
<div align="center">

|                                                              **FE 이수빈**                                                              |                                                                                                                                                                                                                                                                 **FE 이혜원**                                                                                                                                                                                                                                                                 |                                                                                                                                                                                                                                                                     **FE 이소민**                                                                                                                                                                                                                                                                     |
| :-------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://user-images.githubusercontent.com/70246174/180336923-02939b1c-54d4-4a60-8515-d7a37455d68a.jpeg" height=180 width=180> | <img src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/dae70fad-008b-4ca1-8d9b-eaacaa8663ca/IMG_9587.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220829%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220829T081906Z&X-Amz-Expires=86400&X-Amz-Signature=f8309da7d0b3356766aa0242e6701b1ea8afd880051d6fab7b1a0392d6c96669&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22IMG_9587.jpg%22&x-id=GetObject" height=180 width=180> | <img src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/ec1bc74f-29ee-48b6-97c5-278c224dca8e/IMG_7434_2.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220829%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220829T081722Z&X-Amz-Expires=86400&X-Amz-Signature=57a58772b37de01fcf3ab9f88d74cd8eabfcfe158ce2fd8506a4ab421e9cc80a&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22IMG_7434%25202.jpg%22&x-id=GetObject" height=180 width=180> |
|                                        **github**: [@waterbinnn](https://github.com/waterbinnn)                                         |                                                                                                                                                                                                                                            **github**: [@donkeeman](https://github.com/donkeeman)                                                                                                                                                                                                                                             |                                                                                                                                                                                                                                                 **github**: [@nimoseel](https://github.com/nimoseel)                                                                                                                                                                                                                                                  |

|                                                                                                                                                                                                                                                                 **FE 임수진**                                                                                                                                                                                                                                                                 |                                                                                                                                                                                                                                                                 **FE 이현섭**                                                                                                                                                                                                                                                                 |                                                                                                                                                                                                                                                                                     **FE 류재준**                                                                                                                                                                                                                                                                                     |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/c0bd7d79-9e5c-49c5-bc61-44e6366556e4/IMG_9586.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220829%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220829T081944Z&X-Amz-Expires=86400&X-Amz-Signature=fc09c6d95f4462c6895b7a77550b88238f013f9bca3397aa78a55c71db9045ac&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22IMG_9586.jpg%22&x-id=GetObject" height=180 width=180> | <img src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/73f7c1b2-193e-428c-ba8a-577c7c0dd8de/IMG_9588.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220829%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220829T082010Z&X-Amz-Expires=86400&X-Amz-Signature=b6f72cbc9b042e5be978e46d18cb3ced2bf916b746feb9b93ab99e1c1c2f9bfa&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22IMG_9588.jpg%22&x-id=GetObject" height=180 width=180> | <img src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/3f19b0e5-3502-4013-a157-75cd776aff28/KakaoTalk_20220829_171002864.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220829%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220829T082746Z&X-Amz-Expires=86400&X-Amz-Signature=b64bf6093945821590ba688221a2ce777fb079479e0466a87b8828086e81e3c3&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22KakaoTalk_20220829_171002864.jpg%22&x-id=GetObject" height=180 width=180> |
|                                                                                                                                                                                                                                             **github**: [@etoile-j](https://github.com/etoile-j)                                                                                                                                                                                                                                              |                                                                                                                                                                                                                                         **github**: [@leehyeonseop](https://github.com/leehyeonseop)                                                                                                                                                                                                                                          |                                                                                                                                                                                                                                                                  **github**: [@ryungom](https://github.com/ryungom)                                                                                                                                                                                                                                                                   |

</div>
<br>
