# 📬 Rolling
> 코드잇 스프린트 - 프론트엔드 14기 6팀
<br>배포 URL: <https://rolling-paper-five.vercel.app/>
<br>협업 노션: <https://ito-dev.notion.site/2-6-197e6a3d27348055a455d2746ddd9bcb>

## <br>📅 개발기간: 2025. 03. 06 ~ 2025. 03. 21
![Image](https://github.com/user-attachments/assets/9a18294b-f763-434c-8746-aaae2cc37ab8)

## <br>🚀 프로젝트 소개
- 친구, 동료들이 롤링페이퍼를 온라인으로 쉽게 작성할 수 있도록 만든 서비스입니다
  - 다양한 이모지 기능을 통해 감정을 표현할 수 있습니다
  - 간편한 UI로 쉽고 빠르게 롤링페이퍼를 만들 수 있습니다
   
## <br>💁🏻 팀원 소개
| <a href="https://github.com/rachelchoi11"><img src="https://github.com/rachelchoi11.png" width="100"></a> | <a href="https://github.com/zeon0xx0"><img src="https://github.com/zeon0xx0.png" width="100"></a> | <a href="https://github.com/jeonghwanJay"><img src="https://github.com/jeonghwanJay.png" width="100"></a> | <a href="https://github.com/cozy-ito"><img src="https://github.com/cozy-ito.png" width="100"></a> | <a href="https://github.com/kwonjin2"><img src="https://github.com/kwonjin2.png" width="100"></a> |
|------|------|------|------|------|
| **[FE] [최혜윤](https://github.com/rachelchoi11)** | **[FE] [조지현](https://github.com/zeon0xx0)** | **[FE] [지정환](https://github.com/jeonghwanJay)** | **[FE] [진성진](https://github.com/cozy-ito)** | **[FE] [최권진](https://github.com/kwonjin2)** |

## <br>🔧 기술 스택
### Front-End
<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"><img src="https://img.shields.io/badge/module css-1572B6?style=for-the-badge&logo=module css3&logoColor=white"><img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white"><img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"><img src="https://img.shields.io/badge/eslint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white"><img src="https://img.shields.io/badge/prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white">

### Communication
<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"><img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white"><img src="https://img.shields.io/badge/discord-5865F2?style=for-the-badge&logo=discord&logoColor=white"><img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white">

## <br>💡 시작 가이드
```shell
### 1. 클론하기
>git clone https://github.com/cozy-ito/rolling-paper.git

### 2. 디렉토리 이동 
>cd rolling-paper

### 3. 패키지 설치 
>npm install

### 4. 프로젝트 실행
>npm run dev

```

## <br>🫱🏻‍🫲🏻 역할 분담
### ❤️ 최혜윤
- 페이지 작업
  - 메인 페이지 

### 🍑 조지현
- 공통 컴포넌트
  - `ProfilButton`, `Button`, `CardList`, `Toast`
- 페이지 작업
  - 카드 만들기 페이지
    
### 🧑🏻‍🦱 지정환
- 공통 컴포넌트
  - `Badge`, `Input`, `Card`, `TextEditor`
- 페이지 작업
  - 롤링페이퍼에 메세지 보내기 페이지 
    
### 🤗 진성진
- 프로젝트 세팅 및 기본 레이아웃 구성 
- 공통 컴포넌트
  - `ArrowButton`, `Header`
- 페이지 작업
  - 메인 페이지, 생성된 롤링페이퍼 페이지, 생성된 롤링페이퍼 수정 페이지 
        
### 🫧 최권진 
- 공통 컴포넌트
  - `ToggleButton`, `Option`, `Dropdown`, `Modal`
- 페이지 작업
  - 롤링페이퍼 목록 페이지, 404 오류 페이지 
      
## <br>📌 주요 기능

### 1. 메인 페이지
![Image](https://github.com/user-attachments/assets/419be682-f89b-4529-83e6-e9793e4c79df)
- [구경해보기] 버튼 클릭 시 롤링 페이퍼 리스트 페이지로 이동할 수 있습니다 
- [롤링 페이퍼 만들기] 버튼 클릭 시 롤링 페이퍼 만들기 페이지로 이동할 수 있습니다

### <br>2. 롤링페이퍼 목록 페이지
![Image](https://github.com/user-attachments/assets/8a15f4f7-4571-48d0-a866-1cee4c84d547)
- [나도 만들어보기] 버튼 클릭 시 롤링 페이퍼 만들기 페이지로 이동할 수 있습니다 
- [인기 롤링 페이퍼]는 리액션 수를 기준으로 정렬됩니다
- [최근에 만든 롤링 페이퍼]는 최근 생성 기준으로 정렬됩니다
- 스켈레톤 UI와 로딩 스피너를 통해 자연스러운 로딩 효과를 줍니다
- 화살표를 클릭하면 애니메이션 효과가 적용되어 부드럽게 카드를 넘길 수 있습니다 
- 스크롤 스냅 기능으로 스크롤할 때 특정 위치에서 롤링페이퍼가 자동으로 정렬됩니다
- 롤링 페이퍼 카드를 클릭하면 해당 롤링페이퍼 상세 페이지로 이동할 수 있습니다

### <br>3. 롤링페이퍼 만들기 페이지
![Image](https://github.com/user-attachments/assets/1a4b6073-e659-42dc-9c83-0cee21026850)
- [컬러] 토글을 선택하면 배경색을 선택할 수 있고, [이미지] 토글을 선택하면 업로드할 이미지를 선택할 수 있습니다
- 받는 사람의 이름을 입력하지 않을 경우 [생성하기] 버튼은 비활성화 상태가 됩니다
- 받는 사람의 이름을 입력하지 않고 focus out을 하면 "값을 입력해 주세요" 에러 메시지가 뜹니다 
- [생성하기] 버튼을 누르면 롤링페이퍼가 생성되고 생성된 롤링페이퍼 페이지로 이동할 수 있습니다
 
### <br>4. 생성된 롤링페이퍼 페이지
![Image](https://github.com/user-attachments/assets/79d20238-0e55-4445-b6da-970de3cf2c86)
- 해당 롤링페이퍼에 작성된 메시지 카드 목록을 볼 수 있습니다
- 헤더의 [추가] 버튼을 눌러 다양한 이모지를 사용할 수 있습니다
- 헤더의 아래 화살표 버튼을 눌러 이모지 리스트를 확인할 수 있습니다 
- 헤더의 공유 버튼을 통해 카카오톡 및 URL로 해당 롤링페이퍼를 공유할 수 있습니다
- [+] 버튼을 누르면 카드를 작성할 수 있는 롤링페이퍼 메시지 보내기 페이지로 이동할 수 있습니다

### <br>5. 생성된 롤링페이퍼 수정 페이지
![Image](https://github.com/user-attachments/assets/8881704a-64d0-4507-a125-5bbb67da7afd)
- [수정하기] 버튼을 통해 메시지 카드를 수정할 수 있습니다
- [페이지 삭제하기] 버튼을 통해 롤링페이퍼를 삭제할 수 있습니다
	- [페이지 삭제하기] 버튼을 누르면 롤링페이퍼 목록 페이지로 이동합니다 
- [휴지통] 버튼을 통해 메시지 카드를 삭제할 수 있습니다
  
### <br>6. 롤링페이퍼 메시지 보내기 페이지
![Image](https://github.com/user-attachments/assets/7a06445d-a00b-4834-966a-c4940aeb755e)
- 보내는 사람 이름을 입력합니다 (입력할 수 있는 글자는 최대 20자)
- 보내는 사람의 이름을 입력하지 않고 focus out을 하면 "값을 입력해 주세요" 에러 메시지가 뜹니다 
- 프로필 버튼을 클릭하여 원하는 이미지로 프로필을 선택할 수 있습니다 
- 관계를 선택하여 지인, 가족 등의 관계를 표시할 수 있습니다
- 이름과 메세지의 입력값이 비어 있으면 버튼은 비활성화 상태가 됩니다
- 글자 굵기, 기울임, 글자색, 폰트 등을 선택하여 글을 작성할 수 있습니다
- [생성하기] 버튼을 클릭하면 롤링페이퍼가 성공적으로 생성이 되고, 생성된 롤링페이퍼 페이지로 이동합니다 
- 이후 생성된 롤링페이퍼 페이지의 헤더와 롤링페이퍼 목록 페이지의 롤링페이퍼에서 현재까지 작성된 메시지 개수를 실시간으로 확인할 수 있습니다 
  
### <br>7. 404 에러 페이지
![Image](https://github.com/user-attachments/assets/8570b24c-89dd-4ff6-b896-4416ad50dd8b)
- 존재하지 않은 url에 접근했을 경우 해당 페이지가 보여집니다 
