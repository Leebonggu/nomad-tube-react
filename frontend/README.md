## Frontend

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
