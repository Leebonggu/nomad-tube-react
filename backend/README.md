# Backend 

## Session
1. secret: Required option. 노출되면 안되는 정보. 

쿠키를 임의로 변조하는것을 방지하기 위한 값 입니다. 이 값을 통하여 세션을 암호화 하여 저장

2. resave: false 권장. session 데이터가 바뀌기 전까지는 session 저장소의 값을 저장하지 않는다. 

true면 session데이터의 변경 유무에 상관없이 무조건 session 저장소에 저장한다. 

3. saveUninitialized: 세션이 저장되기 전에 uninitialized 상태로 미리 만들어서 저장할지에 대한 것. true 권장. true면 session이 필요하기 전까지는 session을 구동시키지 않는다. 

- https://libertegrace.tistory.com/entry/4-Login-Logout-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0-express-session-middleware-%EC%82%AC%EC%9A%A9

