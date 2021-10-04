# Front Page Migrate to React


## 일기

- 생각보다 어렵군
- 대충 UI만 바꿔서 만들면 될줄알았음
- 근데 일단 UI만드는거부터 어렵긴했고, 반응형 적용에도 좀 힘들었음(여전히?)
- 가장 힘들었던 부분은 로그인. 
- 이전에는 서버에서 temlplate을 사용했던 경우라 url이 같았음
- 근데 react로 바꾸면서, Front, Server 포트가 달라져서 여러 문제가 생기기 시작
  - cors, credential, session, cookie ...
  - 몇번 공부했던 것들이긴한데 봐도봐도 어렵긴하다
  - 일단, 익숙해지면 되겠지. 잘 알아두자

## Front

### box-sizing: border-box;
- width 100% 임에도 오른쪽 여백이 남음
- box-sizing: border-box;로 해결

box-sizing은 박스의 크기를 화면에 표시하는 방식을 변경하는 속성입니다. width와 height는 엘리먼트의 컨텐츠의 크기를 지정합니다. 따라서 테두리가 있는 경우에는 테두리의 두께로 인해서 원하는 크기를 찾기가 어렵습니다. box-sizing 속성을 border-box로 지정하면  테두리를 포함한 크기를 지정할 수 있기 때문에 예측하기가 더 쉽습니다. 최근엔 모든 엘리먼트에 이 값을 지정하는 경우가 늘고 있습니다. 

- https://opentutorials.org/course/2418/13405

### footer 고정
- https://stackoverflow.com/questions/39857425/react-page-keep-footer-at-the-bottom-of-the-page

### 아직 CSS가 좀 어럽네
- 리스폰시브..
- Width, Height
- vw, vh, %, rem, em, px

## 이제 서버랑 연결하면됨.

## Backend

### Session

1. secret: Required option. 노출되면 안되는 정보. 

쿠키를 임의로 변조하는것을 방지하기 위한 값 입니다. 이 값을 통하여 세션을 암호화 하여 저장

2. resave: false 권장. session 데이터가 바뀌기 전까지는 session 저장소의 값을 저장하지 않는다. 

true면 session데이터의 변경 유무에 상관없이 무조건 session 저장소에 저장한다. 

3. saveUninitialized: 세션이 저장되기 전에 uninitialized 상태로 미리 만들어서 저장할지에 대한 것. true 권장. true면 session이 필요하기 전까지는 session을 구동시키지 않는다. 

- https://libertegrace.tistory.com/entry/4-Login-Logout-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0-express-session-middleware-%EC%82%AC%EC%9A%A9

### Login 

- 이틀째 해결중
- 왜 세션이 설정이 안되는가??
- 로그인에서 req.session.user로 세션을 설정.
- 근데 왜 다른 endpoint에서 확인을 못하는가??

- 일단 passport도입 시작

### cookie, session

- 로그인을 한다고해서 서버와 프론트가 같은 정보를 가지고 있지는 않음
- 그렇다고 로그인 정보를 통으로 넘겨주면 보안에 문제가 생김
- 그래서 cookie를 넘겨주는데, 일종의 접근 키? 같은개념이라고 생각하면 될듯
- 임의로 생성된 쿠키를 넘겨주면, 그 쿠키를 가지고 서버는 어떤 사용자인지 인지함
- 프론트에는 쿠키, 서버에는 세션을 가지고 있음
- 근데 세션에 모든 정보가 들어가있으면, 너무 무거움(정보가 커질경우)
- 그래서 세션에 아이디만들고, 그 아이디를 가지고 디비를 확인

### 도메인이 다를경우

- 와 하루종일 풀었음.
- 서버와 프론트가 쿠키를 공유못함. 어떻게 해결해야 하는가?
- cors: access-control-allow-origin: true
- cookie 역시 전달이 안됨.
- cookie가 전달이 안되면, 서버는 누가 정보를 보내는지 모름
- access-control-allow-credential: true
- credential을 설정해줘야함
- cors의 경우 origin: * 로 되어있다면, 정확한 주소를 써줘야함
- 민감한 정보를 주고받기때문에 정책에서 더 강력한 보안을 요구함

```js
// backend
app.use(cors({
  origin: 'http://localhost:3000', // true로 해도됨,
  credentials: true,
}));
```
```js
// frontend
// axios를 사용할 경우, 최상위 파일에서
axios.default.withCredentials = true;
```

### login 유지

- contextAPI를 통해, 전역적으로 뿌려줌
