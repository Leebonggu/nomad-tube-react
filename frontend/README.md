## Frontend

### Redux 도입
- 기존 contextAPI -> Redux-thunk로  변경
- 현재 auth부분만 변경, 추후 video부분까지 바꿔야함
- 지금까지 느끼는바는 역시 무엇이 되었든 중간에 도입하는 것은 생각보다 비용이 만이들어간다
- 여기서 비용이라함은, 시간적인 비용이 제일 크겠다.
- 여하튼, 이게 꼭 필요한가는 바꾸면서 생각해봐야겠다. contextAPI, Redux나 어차피 전역상태 관리니 크게 바뀐건 없다
- 그레도 메인이되는 Components가 깔금해진것은 확실 (axios제거, 불필요한 useState, useContext 제거)
- Pug -> React때도 그렇고, Redux때도 그렇고, 기존방식에서 새 방식을 도입할때는 언제나 왜?라는 질문에대해 답변이 중요해보인다.
- 그냥 좋다하니 사용하면 기능은 익히겠지만, 정학한 목적이 없어서 조~금답답하다. 또 잘 사용하고있는지에 대해 답할수가 없어.
- 평소 가진 생각이지만, 역시 기술은 무조건 최신기술보다는 있는 기술부터 잘 쓰는게...그래도 트렌드는 잘 따라가야지

### 절대경로

- 상대경로 쓰기 귀찮아서 절대경로로 만듬

```json
// jsconfig.json
{
  "compilerOptions": {
    "baseUrl": "src"
  },
  "include": ["src"]
}
```

### box-sizing: border-box;
- width 100% 임에도 오른쪽 여백이 남음
- box-sizing: border-box;로 해결

box-sizing은 박스의 크기를 화면에 표시하는 방식을 변경하는 속성입니다. width와 height는 엘리먼트의 컨텐츠의 크기를 지정합니다. 따라서 테두리가 있는 경우에는 테두리의 두께로 인해서 원하는 크기를 찾기가 어렵습니다. box-sizing 속성을 border-box로 지정하면  테두리를 포함한 크기를 지정할 수 있기 때문에 예측하기가 더 쉽습니다. 최근엔 모든 엘리먼트에 이 값을 지정하는 경우가 늘고 있습니다. 

- https://opentutorials.org/course/2418/13405

### footer 고정
- https://stackoverflow.com/questions/39857425/react-page-keep-footer-at-the-bottom-of-the-page

## 절대경로

- 상대경로 쓰기 귀찮아서 절대경로로 만듬

```json
// jsconfig.json
{
  "compilerOptions": {
    "baseUrl": "src"
  },
  "include": ["src"]
}
```


## box-sizing: border-box;
- width 100% 임에도 오른쪽 여백이 남음
- box-sizing: border-box;로 해결

box-sizing은 박스의 크기를 화면에 표시하는 방식을 변경하는 속성입니다. width와 height는 엘리먼트의 컨텐츠의 크기를 지정합니다. 따라서 테두리가 있는 경우에는 테두리의 두께로 인해서 원하는 크기를 찾기가 어렵습니다. box-sizing 속성을 border-box로 지정하면  테두리를 포함한 크기를 지정할 수 있기 때문에 예측하기가 더 쉽습니다. 최근엔 모든 엘리먼트에 이 값을 지정하는 경우가 늘고 있습니다. 

- https://opentutorials.org/course/2418/13405

## footer 고정
- https://stackoverflow.com/questions/39857425/react-page-keep-footer-at-the-bottom-of-the-page

## 아직 CSS가 좀 어럽네
- 리스폰시브..
- Width, Height
- vw, vh, %, rem, em, px

## 이제 서버랑 연결하면됨.

## login 유지

- contextAPI를 통해, 전역적으로 뿌려줌

## Video Watch

- 내가 업로드한 비디오면, 삭제버튼이 보게해 해놓음

## Comment 기능추가

 - 서버에 라우트만들고, 코멘트 기능추가
 - 댓글 단 사람은 삭제 버튼이 보임
 
