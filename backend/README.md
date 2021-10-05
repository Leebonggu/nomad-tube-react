# Backend 

## Session

1. secret: Required option. 노출되면 안되는 정보. 

쿠키를 임의로 변조하는것을 방지하기 위한 값 입니다. 이 값을 통하여 세션을 암호화 하여 저장

2. resave: false 권장. session 데이터가 바뀌기 전까지는 session 저장소의 값을 저장하지 않는다. 

true면 session데이터의 변경 유무에 상관없이 무조건 session 저장소에 저장한다. 

3. saveUninitialized: 세션이 저장되기 전에 uninitialized 상태로 미리 만들어서 저장할지에 대한 것. true 권장. true면 session이 필요하기 전까지는 session을 구동시키지 않는다. 

- https://libertegrace.tistory.com/entry/4-Login-Logout-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0-express-session-middleware-%EC%82%AC%EC%9A%A9

## Login 

- 이틀째 해결중
- 왜 세션이 설정이 안되는가??
- 로그인에서 req.session.user로 세션을 설정.
- 근데 왜 다른 endpoint에서 확인을 못하는가??

- 일단 passport도입 시작

## cookie, session

- 로그인을 한다고해서 서버와 프론트가 같은 정보를 가지고 있지는 않음
- 그렇다고 로그인 정보를 통으로 넘겨주면 보안에 문제가 생김
- 그래서 cookie를 넘겨주는데, 일종의 접근 키? 같은개념이라고 생각하면 될듯
- 임의로 생성된 쿠키를 넘겨주면, 그 쿠키를 가지고 서버는 어떤 사용자인지 인지함
- 프론트에는 쿠키, 서버에는 세션을 가지고 있음
- 근데 세션에 모든 정보가 들어가있으면, 너무 무거움(정보가 커질경우)
- 그래서 세션에 아이디만들고, 그 아이디를 가지고 디비를 확인

## 도메인이 다를경우

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

## CommentRouter

- 코멘트 기능
- 코멘트 삭제 기능 추가