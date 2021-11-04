# Front Page Migrate to React

## Stack

### Front
  - React
  - Redux-thunk
  - React-Router
  - axios
  - styled-components
  - prop-types
  - antd

### Back
  -  express
  -  passport
  -  mongo

### Deploy 
  - EC2 (인스턴스 종료)

### Extra to do
  - typescript
  - SEO
  - nginx 
  - CI/CD
  - Redux 다시 들어내서 => SWR?


## 상황설정

### 기존 view pug template 사용 -> React 변환

1) 상황1
- React를 도입하고 싶어하는 사람을 가정
- 기존 방식은 tempplate engine을 사용해서 view 그려주고 있었다
- 하지만 최신 웹을보니, React를 많이 쓰더라 -> 우리도 바꿔보자는 상황을 가정
- 이미 서버는 구성되어 있는 상황에서 Front 영역을 React로 변경하는 작업

2) 상황2
- 기존 React로만 만들어진 환경을 한번 더 변경 -> typescript
- CSR은 검색최적화가 안된다는데...검색이 조금 더 잘되게 하고싶다


## 일기

1) 일정
- 1차 작업 예상기간: 2일, 실제 걸린기간: 5일

2) 기록
- 대충 UI만 바꾸고, API서버에 데이터 요청하는 로직만 만들면 금방 끝날줄 알았다
- 그런데 생각보다 오래걸렸던 부분이 로그인
  - 이전에는 서버에서 temlplate rendering 하는 경우라 데이터를 요청하는 경우에 제약이 없었다.
  - React로 바꾸면서, Front, Server 출처가 달라져서 여러 문제가 생기기 시작
  - SOP
    -  Same Origin Policy의 약자로, 다른 출처의 리소스를 사용하는 것에 제한하는 방식
    -  동일 출처 정책은 웹 브라우저 보안을 위해 프로토콜, 호스트, 포트가 동일한 서버로만 요청을 주고 받을 수 있도록 한 정책
  - CORS
    - 서로 다른 도메인이 정보를 주고 받으려할 떄 브라우저에서 발생합니다.
    - 이 문제를 해결하기 위해선 브라우저에 Cross-Origin-Resource-Sharing 허용(이 경로는 괜찮다.)
    - 추가적인 HTTP헤더를 사용하여 한 출처에서 실행중인 웹애플리케이션이 다른 출처의 자원에 접근할 수 있는 권한을 부여하도록 브라우저에 알려주는 체제
    - 1. prxoy
      - 대리/대신 
      - 보안상 통신할 수 없는 두 주체가 통신할 수 있게 해주는 방법 (중계서버)
    - 2. response header: access-control-allow-origin: * 
  - 너네 서로 다르니까, 믿을수 있겠어? => 얘는 괜찮아 라고 말해줌
  - Cookie를 전달해주지 못한다 -> 로그인이 유지되지 않는다.
    - Credentials: 쿠키, 인증헤더, TLS client certificates(증명서)
    - [FRONT] axios -> withCredential: true / [BACK] cors -> cors({ credential: true });

## 느끼는 상황들

- 사실 현상황에서 React가 필요없다는 상황 -> 그렇게 동적인 작업이 이뤄지지 않는다.
- CSR로 초기 로딩시 화면 깜빡임이 존재하는데, 오히려 사용자 경험에 안좋은 영향을 주지 않을까


