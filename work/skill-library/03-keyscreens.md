# 키스크린: skill-library

공통 규칙
- 좌우 여백 {spacing.md}, 구획 간격 {spacing.section}, 배경 {colors.canvas}, 본문 글자색 {colors.ink}, 보조 글자색 {colors.text-muted}.
- 그림자: box-shadow: none (모든 요소).
- 칩·배지·버튼·탭 선택 항목은 전부 반경: 9999px. 카드는 반경: 24px, 입력창·접이식 행·첨부 파일 행은 반경: 16px.
- accent 색은 이 3장 어디에도 쓰지 않는다. 버튼은 {colors.primary} 또는 {colors.canvas-soft} 또는 윤곽선만 쓴다.
- design.md에 없는 요소는 같은 역할의 design.md 컴포넌트로 옮긴다. 새 컴포넌트 이름은 만들지 않는다.

## 키스크린 1: 스킬 목록
프레임: 390×844

- 기준 사용자: paid 회원. 카드 권한이 무료·유료인 카드는 열려 있고, 소속 아닌 코호트 전용 카드는 잠금이다.
- 사용 컴포넌트: text-input, button-pill-soft, button-outline, button-primary, pricing-card, pricing-card-featured, badge-overlay, nav-pill
- 구성 순서 (위에서 아래)
  1. 화면 제목 "스킬 라이브러리": {typography.heading-1}, 위쪽 여백 {spacing.lg}.
  2. 검색창: text-input, 배경 {colors.field}, 테두리 없음, 안쪽 여백 {spacing.sm} {spacing.md}, 안내 문구 "스킬·프롬프트 검색" {colors.text-faint}, 반경: 16px. 입력하면 자동완성 목록이 아래로 뜬다.
  3. 추천 검색어 칩 줄: 가로 스크롤 한 줄, 칩 3개 예시 "회의록 요약", "보고서 초안", "데이터 정리". button-pill-soft, 글자 {typography.label}, 칩 간격 {spacing.xs}, 반경: 9999px.
  4. 태그·난이도 칩 필터 줄: 가로 스크롤 한 줄, 복수 선택. 예시 칩 "문서 작성", "분석", "입문", "중급", "고급". 선택 안 된 칩은 button-pill-soft, 선택된 칩은 button-outline({colors.hairline} 1px 테두리, 글자 {colors.ink}), 반경: 9999px. 선택된 칩이 하나 이상이면 맨 앞에 "초기화" button-pill-soft가 나타난다. 이 화면 예시는 "문서 작성", "입문" 두 개가 선택되고 초기화가 보이는 상태.
  5. 결과 개수와 정렬 버튼 줄: 왼쪽 "12개" {typography.body-sm} {colors.text-muted}, 오른쪽 "최신순" 정렬 버튼. 정렬 버튼은 button-pill-soft, 반경: 9999px. 누르면 하단 시트에서 단일 선택(체크 표시).
  6. 스킬 카드 목록: 1열 리스트, 카드 간격 {spacing.sm}. 390px 폭에서 2열은 카드당 약 170px라 스킬명 2줄과 보조 정보 4개가 잘려 1열로 한다.
- 스킬 카드 구조 (3장 예시)
  - 카드 A (열림): pricing-card, 배경 {colors.canvas}, 1px {colors.hairline-soft} 테두리, 반경: 24px, 안쪽 여백 {spacing.lg}.
    - 스킬명 "회의록 요약 프롬프트: 핵심 결정과 다음 할 일 정리" 2줄, {typography.title}, 2줄 넘으면 말줄임.
    - 보조 정보 한 줄 {typography.caption} {colors.text-muted}: "문서 작성 · 입문 · ChatGPT · 2026.09.28".
    - 권한 배지 "무료": 카드 우측 상단, badge-overlay, 글자 {typography.label}, 반경: 9999px.
  - 카드 B (열림, 유료): 같은 구조. 스킬명 "주간 보고서 초안 프롬프트: 지난주 실적과 이번 주 계획 정리", 보조 정보 "문서 작성 · 중급 · Claude · 2026.09.21", 배지 "유료".
  - 카드 C (잠금 예시 1장): pricing-card-featured, 배경 {colors.canvas-soft}, 테두리 없음, 반경: 24px. 스킬명 "신규 입사자 온보딩 자료 프롬프트: 직무별 첫 주 안내문 작성", 보조 정보 "문서 작성 · 고급 · Claude · 2026.09.14". 우측 상단에 배지 "코호트 전용"(badge-overlay, 반경: 9999px)과 그 옆에 자물쇠 아이콘({colors.text-muted}, 20px). 개요 정보만 보이고 누르면 잠금 상세로 이동한다.
- 하단: 목록 끝이 화면 아래로 이어진다. 하단 고정 요소 없음.
- 옮긴 컴포넌트와 이유
  - 칩 필터, 정렬 버튼: design.md에 칩이 없어 같은 알약 모양의 button-pill-soft로 옮긴다. 선택 상태는 button-outline으로 구분한다.
  - 카드 권한 배지: 같은 알약 배지 역할의 badge-overlay로 옮긴다(badge-popular는 accent 색이라 쓰지 않는다).
  - 스킬 카드: 윤곽선 카드 역할의 pricing-card, 잠금 카드는 tint 강조 역할의 pricing-card-featured로 옮긴다.

## 키스크린 2: 스킬 상세 (접근 권한 있음)
프레임: 390×844

- 기준 사용자: paid 회원. 카드 권한이 유료인 "회의록 요약 프롬프트"를 연 상태.
- 사용 컴포넌트: segmented-control, segmented-control-active, pricing-card, faq-row, badge-overlay, button-primary, button-outline, button-pill-soft, nav-pill
- 구성 순서 (위에서 아래)
  1. 상단 고정 탭: segmented-control(트랙 {colors.canvas-soft}, 반경: 9999px) 안에 "개요 / 프롬프트·파일 / 사용 순서 / 예시·주의" 4칸. 글자 {typography.label}, 선택 칸은 segmented-control-active({colors.canvas} 흰 알약, 반경: 9999px, box-shadow: none), 선택 안 된 칸 글자 {colors.text-muted}. 스크롤해도 화면 위에 붙는다. 이 화면은 "개요" 칸이 선택된 상태.
  2. 개요 구획: 스킬명 "회의록 요약 프롬프트: 핵심 결정과 다음 할 일 정리" {typography.heading-2}, 권한 배지 "유료"(badge-overlay, 반경: 9999px). 그 아래 정보 행 {typography.body}: 카테고리 "문서 작성", 난이도 "입문", 추천 대상 "회의가 잦은 팀원", 사용 도구 "ChatGPT, Claude", 언제 쓰나요? "회의가 끝난 직후 메모를 정리할 때", 준비물 "회의 메모 원문", 업데이트 날짜 "2026.09.28". 항목 이름은 {colors.text-muted} {typography.caption}, 값은 {colors.ink}.
  3. 프롬프트·파일 구획 (제목 "프롬프트·파일" {typography.heading-4}):
     - 프롬프트 본문: pricing-card, 반경: 24px, 배경 {colors.canvas}, 1px {colors.hairline-soft} 테두리, 글자 {typography.body}, 본문 첫 3줄 예시 "아래 회의 메모를 읽고 결정 사항, 담당자, 기한으로 나눠 정리해 주세요." 길게 누르면 직접 선택 가능.
     - 첨부 파일 목록 일부: faq-row 2줄 ("meeting-summary-template.md", "meeting-notes-sample.txt"), 배경 {colors.canvas-soft}, 반경: 16px, 끝에 아래 화살표 아이콘, 줄 간격 {spacing.sm}.
  4. 관련 미션 가로 목록: 제목 "관련 미션" {typography.heading-4}, 가로 스크롤 카드 2장. 카드는 pricing-card, 반경: 24px, 너비 약 240px, 미션 제목 "9월 미션: 업무 자동화 프롬프트 만들기" {typography.title}. 누르면 미션 상세로 이동. 아래에 관련 스킬 가로 목록을 같은 방식으로 둔다.
  5. 맨 아래 여백: 하단 고정 바에 가리지 않도록 {spacing.section-lg} 확보.
- 하단 고정 행동 바: nav-pill 모양(떠 있는 알약 바, 배경 {colors.canvas-soft}, 반경: 9999px, 화면 아래에서 {spacing.md} 띄움). 안에 버튼 2개를 나란히 둔다.
  - "프롬프트 복사" button-primary, 배경 {colors.primary}, 글자 {colors.on-primary} {typography.link}, 반경: 9999px.
  - "파일 다운로드" button-outline, 배경 {colors.canvas}, 1px {colors.hairline} 테두리, 글자 {colors.ink}, 반경: 9999px.
  - 첨부 파일이 없는 카드는 파일 다운로드 버튼을 숨긴다.
- 옮긴 컴포넌트와 이유
  - 상단 고정 텍스트 탭: design.md에 탭이 없어 같은 선택 토글 역할의 segmented-control로 옮긴다.
  - 하단 고정 바: design.md에 하단 바가 없어 떠 있는 알약 바 역할의 nav-pill로 옮긴다.
  - 첨부 파일 행, 접이식 항목: 같은 역할의 faq-row로 옮긴다.

## 키스크린 3: 스킬 상세 (잠금)
프레임: 390×844

- 기준 사용자: free 회원. 카드 권한이 유료인 "주간 보고서 초안 프롬프트"를 연 상태.
- 사용 컴포넌트: segmented-control, segmented-control-active, pricing-card, ex-empty-state-card, badge-overlay, button-primary, nav-pill
- 구성 순서 (위에서 아래)
  1. 상단 고정 탭: 키스크린 2와 같은 segmented-control 4칸("개요" 칸 선택, segmented-control-active, box-shadow: none, 반경: 9999px).
  2. 개요 구획 (보임): 스킬명 "주간 보고서 초안 프롬프트: 지난주 실적과 이번 주 계획 정리" {typography.heading-2}, 권한 배지 "유료"(badge-overlay, 반경: 9999px). 정보 행: 카테고리 "문서 작성", 난이도 "중급", 추천 대상 "주간 보고를 쓰는 팀원", 사용 도구 "Claude", 언제 쓰나요? "금요일 오후 주간 보고를 작성할 때", 준비물 "이번 주 업무 기록", 업데이트 날짜 "2026.09.21". 글자 규칙은 키스크린 2와 같다.
  3. 잠금 구획: 프롬프트·파일, 예시 결과 구획 자리에 본문 대신 가림 영역을 둔다.
     - 가림 영역: ex-empty-state-card, 배경 {colors.canvas-soft}, 반경: 24px, 안쪽 여백 {spacing.lg}, 가운데 정렬.
     - 자물쇠 아이콘 {colors.ink} 32px, 그 아래 안내 문구 "이 스킬은 유료 멤버가 사용할 수 있어요" {typography.title}.
     - 가림 영역 뒤에 프롬프트 본문 첫 줄이 흐릿한 자리표시 막대(회색 {colors.field}, 반경: 16px) 3줄로만 보인다. 실제 프롬프트 글자는 보이지 않는다.
     - 구획 제목 "프롬프트·파일", "예시 결과" 두 개가 가림 영역 안에 {colors.text-muted} {typography.body-sm}로 같이 적힌다.
  4. 관련 미션 가로 목록: 키스크린 2와 같은 위치, pricing-card 카드 1장 이상, 반경: 24px.
  5. 맨 아래 여백 {spacing.section-lg}.
- 하단 고정 행동 바: nav-pill 모양(배경 {colors.canvas-soft}, 반경: 9999px). 복사·다운로드 버튼은 없고 버튼 하나만 둔다.
  - "유료 멤버 알아보기" button-primary, 배경 {colors.primary}, 글자 {colors.on-primary} {typography.link}, 반경: 9999px, 바 안에서 가로 전체 폭.
  - guest 회원이면 같은 자리 문구가 "가입하기"로 바뀐다.
- 옮긴 컴포넌트와 이유
  - 잠금 가림 영역: design.md에 잠금 표시가 없어 안내용 빈 상태 틀 역할의 ex-empty-state-card로 옮긴다.
  - 하단 고정 바와 상단 탭: 키스크린 2와 같은 이유로 nav-pill, segmented-control로 옮긴다.
