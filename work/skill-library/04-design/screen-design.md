프레임: 390×844

# 화면 설계: skill-library

색은 모두 토큰 참조. 그림자는 box-shadow: none만 사용한다. 좌우 여백 {spacing.md}, 카드 간격 {spacing.sm}, 구획 간격 {spacing.section}. 좌표는 x, y, 너비×높이(px)이고 프레임 왼쪽 위가 0, 0이다.

## 키스크린 1: 스킬 목록
프레임: 390×844
box-shadow: none. paid 회원 기준. 카드 A, B는 열림, 카드 C는 잠금. 하단 고정 요소 없음. 목록은 카드 C 아래로 스크롤되어 이어진다.

- 화면 배경 | - | 0, 0, 390×844 | 채움 {colors.canvas} | 반경: 0px | -
- 화면 제목 | - | 16, 68, 358×37 | 글자 {colors.ink} {typography.heading-1} | 반경: 0px | 스킬 라이브러리
- 검색창 | text-input | 16, 121, 358×48 | 채움 {colors.field}, 테두리 없음, 글자 {colors.text-faint} {typography.body} | 반경: 16px | 스킬·프롬프트 검색
- 추천 칩 1 | button-pill-soft | 16, 181, 100×32 | 채움 {colors.canvas-soft}, 글자 {colors.ink} {typography.label} | 반경: 9999px | 회의록 요약
- 추천 칩 2 | button-pill-soft | 124, 181, 100×32 | 채움 {colors.canvas-soft}, 글자 {colors.ink} {typography.label} | 반경: 9999px | 보고서 초안
- 추천 칩 3 | button-pill-soft | 232, 181, 100×32 | 채움 {colors.canvas-soft}, 글자 {colors.ink} {typography.label} | 반경: 9999px | 데이터 정리
- 필터 칩 초기화 | button-pill-soft | 16, 225, 48×32 | 채움 {colors.canvas-soft}, 글자 {colors.ink} {typography.label} | 반경: 9999px | 초기화
- 필터 칩 문서 작성(선택됨) | button-outline | 72, 225, 76×32 | 채움 {colors.canvas}, 1px {colors.hairline} 테두리, 글자 {colors.ink} {typography.label} | 반경: 9999px | 문서 작성
- 필터 칩 분석 | button-pill-soft | 156, 225, 46×32 | 채움 {colors.canvas-soft}, 글자 {colors.ink} {typography.label} | 반경: 9999px | 분석
- 필터 칩 입문(선택됨) | button-outline | 210, 225, 46×32 | 채움 {colors.canvas}, 1px {colors.hairline} 테두리, 글자 {colors.ink} {typography.label} | 반경: 9999px | 입문
- 필터 칩 중급 | button-pill-soft | 264, 225, 46×32 | 채움 {colors.canvas-soft}, 글자 {colors.ink} {typography.label} | 반경: 9999px | 중급
- 필터 칩 고급 | button-pill-soft | 318, 225, 46×32 | 채움 {colors.canvas-soft}, 글자 {colors.ink} {typography.label} | 반경: 9999px | 고급
- 결과 개수 | - | 16, 269, 100×32 | 글자 {colors.text-muted} {typography.body-sm}, 세로 가운데 | 반경: 0px | 12개
- 정렬 버튼 | button-pill-soft | 290, 269, 84×32 | 채움 {colors.canvas-soft}, 글자 {colors.ink} {typography.label} | 반경: 9999px | 최신순
- 카드 A | pricing-card | 16, 313, 358×122 | 채움 {colors.canvas}, 1px {colors.hairline-soft} 외곽선 | 반경: 24px | -
- 카드 A 스킬명 | pricing-card | 40, 337, 250×48 | 글자 {colors.ink} {typography.title}, 2줄, 넘으면 말줄임 | 반경: 0px | 회의록 요약 프롬프트: 핵심 결정과 다음 할 일 정리
- 카드 A 권한 배지 | badge-overlay | 302, 337, 48×24 | 배지 스크림(회색 반투명), 글자 {colors.canvas} {typography.label} | 반경: 9999px | 무료
- 카드 A 보조 정보 | pricing-card | 40, 393, 310×17 | 글자 {colors.text-muted} {typography.caption} | 반경: 0px | 문서 작성 · 입문 · ChatGPT · 2026.09.28
- 카드 B | pricing-card | 16, 447, 358×122 | 채움 {colors.canvas}, 1px {colors.hairline-soft} 외곽선 | 반경: 24px | -
- 카드 B 스킬명 | pricing-card | 40, 471, 250×48 | 글자 {colors.ink} {typography.title}, 2줄, 넘으면 말줄임 | 반경: 0px | 주간 보고서 초안 프롬프트: 지난주 실적과 이번 주 계획 정리
- 카드 B 권한 배지 | badge-overlay | 302, 471, 48×24 | 배지 스크림(회색 반투명), 글자 {colors.canvas} {typography.label} | 반경: 9999px | 유료
- 카드 B 보조 정보 | pricing-card | 40, 527, 310×17 | 글자 {colors.text-muted} {typography.caption} | 반경: 0px | 문서 작성 · 중급 · Claude · 2026.09.21
- 카드 C(잠금) | pricing-card-featured | 16, 581, 358×153 | 채움 {colors.canvas-soft}, 테두리 없음 | 반경: 24px | -
- 카드 C 권한 배지 | badge-overlay | 242, 605, 80×24 | 배지 스크림(회색 반투명), 글자 {colors.canvas} {typography.label} | 반경: 9999px | 코호트 전용
- 카드 C 자물쇠 아이콘 | pricing-card-featured | 330, 607, 20×20 | 단색 {colors.text-muted}, 채움 없음 | 반경: 0px | 자물쇠 아이콘
- 카드 C 스킬명 | pricing-card-featured | 40, 637, 310×48 | 글자 {colors.ink} {typography.title}, 2줄, 넘으면 말줄임 | 반경: 0px | 신규 입사자 온보딩 자료 프롬프트: 직무별 첫 주 안내문 작성
- 카드 C 보조 정보 | pricing-card-featured | 40, 693, 310×17 | 글자 {colors.text-muted} {typography.caption} | 반경: 0px | 문서 작성 · 고급 · Claude · 2026.09.14

동작 메모: 검색창에 입력하면 자동완성 목록이 아래로 뜬다. 필터 칩 줄과 추천 칩 줄은 가로 스크롤이고 필터는 복수 선택이다. 정렬 항목을 누르면 하단 시트에서 단일 선택(체크 표시)이다. 카드 C를 누르면 잠금 상세로 이동한다. 카드 C는 개요 정보만 보이고 프롬프트·파일·예시 결과는 보이지 않는다. 카드 C 아래로 카드 목록이 이어진다.

## 키스크린 2: 스킬 상세 (접근 권한 있음)
프레임: 390×844
box-shadow: none. paid 회원 기준, 권한이 유료인 "회의록 요약 프롬프트"를 연 상태. 상단 탭은 스크롤해도 화면 위에 붙는다.

- 화면 배경 | - | 0, 0, 390×844 | 채움 {colors.canvas} | 반경: 0px | -
- 상단 탭 트랙 | segmented-control | 16, 56, 358×44 | 채움 {colors.canvas-soft} | 반경: 9999px | -
- 탭 칸 개요(선택됨) | segmented-control-active | 20, 60, 87×36 | 채움 {colors.canvas}, 글자 {colors.ink} {typography.label}, box-shadow: none | 반경: 9999px | 개요
- 탭 칸 프롬프트·파일 | segmented-control | 107, 60, 87×36 | 글자 {colors.text-muted} {typography.label} | 반경: 9999px | 프롬프트·파일
- 탭 칸 사용 순서 | segmented-control | 194, 60, 87×36 | 글자 {colors.text-muted} {typography.label} | 반경: 9999px | 사용 순서
- 탭 칸 예시·주의 | segmented-control | 281, 60, 87×36 | 글자 {colors.text-muted} {typography.label} | 반경: 9999px | 예시·주의
- 권한 배지 | badge-overlay | 16, 116, 48×24 | 배지 스크림(회색 반투명), 글자 {colors.canvas} {typography.label} | 반경: 9999px | 유료
- 스킬명 | - | 16, 148, 358×65 | 글자 {colors.ink} {typography.heading-2}, 2줄 | 반경: 0px | 회의록 요약 프롬프트: 핵심 결정과 다음 할 일 정리
- 정보 행 카테고리 | - | 16, 225, 358×24 | 이름 {colors.text-muted} {typography.caption}, 값 {colors.ink} {typography.body} | 반경: 0px | 카테고리 / 문서 작성
- 정보 행 난이도 | - | 16, 249, 358×24 | 이름 {colors.text-muted} {typography.caption}, 값 {colors.ink} {typography.body} | 반경: 0px | 난이도 / 입문
- 정보 행 추천 대상 | - | 16, 273, 358×24 | 이름 {colors.text-muted} {typography.caption}, 값 {colors.ink} {typography.body} | 반경: 0px | 추천 대상 / 회의가 잦은 팀원
- 정보 행 사용 도구 | - | 16, 297, 358×24 | 이름 {colors.text-muted} {typography.caption}, 값 {colors.ink} {typography.body} | 반경: 0px | 사용 도구 / ChatGPT, Claude
- 정보 행 언제 쓰나요? | - | 16, 321, 358×24 | 이름 {colors.text-muted} {typography.caption}, 값 {colors.ink} {typography.body} | 반경: 0px | 언제 쓰나요? / 회의가 끝난 직후 메모를 정리할 때
- 정보 행 준비물 | - | 16, 345, 358×24 | 이름 {colors.text-muted} {typography.caption}, 값 {colors.ink} {typography.body} | 반경: 0px | 준비물 / 회의 메모 원문
- 정보 행 업데이트 날짜 | - | 16, 369, 358×24 | 이름 {colors.text-muted} {typography.caption}, 값 {colors.ink} {typography.body} | 반경: 0px | 업데이트 날짜 / 2026.09.28
- 구획 제목 | - | 16, 441, 358×24 | 글자 {colors.ink} {typography.heading-4} | 반경: 0px | 프롬프트·파일
- 프롬프트 본문 카드 | pricing-card | 16, 473, 358×116 | 채움 {colors.canvas}, 1px {colors.hairline-soft} 외곽선 | 반경: 24px | -
- 프롬프트 본문 글자 | pricing-card | 40, 497, 310×68 | 글자 {colors.ink} {typography.body}, 길게 누르면 직접 선택 | 반경: 0px | 아래 회의 메모를 읽고 결정 사항, 담당자, 기한으로 나눠 정리해 주세요.
- 첨부 파일 행 1 | faq-row | 16, 601, 358×48 | 채움 {colors.canvas-soft}, 글자 {colors.ink} {typography.body} | 반경: 16px | meeting-summary-template.md
- 첨부 파일 행 1 화살표 | faq-row | 338, 613, 24×24 | 단색 {colors.text-muted}, 채움 없음 | 반경: 0px | 아래 화살표 아이콘
- 첨부 파일 행 2 | faq-row | 16, 661, 358×48 | 채움 {colors.canvas-soft}, 글자 {colors.ink} {typography.body} | 반경: 16px | meeting-notes-sample.txt
- 첨부 파일 행 2 화살표 | faq-row | 338, 673, 24×24 | 단색 {colors.text-muted}, 채움 없음 | 반경: 0px | 아래 화살표 아이콘
- 하단 고정 행동 바 | nav-pill | 16, 772, 358×56 | 채움 {colors.canvas-soft} | 반경: 9999px | -
- 프롬프트 복사 | button-primary | 24, 780, 167×40 | 채움 {colors.primary}, 글자 {colors.canvas} {typography.link} | 반경: 9999px | 프롬프트 복사
- 파일 다운로드 | button-outline | 199, 780, 167×40 | 채움 {colors.canvas}, 1px {colors.hairline} 테두리, 글자 {colors.ink} {typography.link} | 반경: 9999px | 파일 다운로드

프레임 아래로 이어지는 스크롤 구획(프레임 밖, 좌표 없음): 첨부 파일 행 아래 {spacing.section} 간격 뒤에 "관련 미션" 제목({typography.heading-4}), 가로 스크롤 pricing-card 2장(반경: 24px, 너비 240, 제목 {typography.title} "9월 미션: 업무 자동화 프롬프트 만들기"), 그 아래 관련 스킬 가로 목록(같은 방식), 맨 아래 여백 {spacing.section-lg}. 첨부 파일이 없는 스킬은 파일 다운로드 줄을 숨긴다.

## 키스크린 3: 스킬 상세 (잠금)
프레임: 390×844
box-shadow: none. free 회원 기준, 권한이 유료인 "주간 보고서 초안 프롬프트"를 연 상태. 개요만 보이고 프롬프트·파일·예시 결과는 가려진다.

- 화면 배경 | - | 0, 0, 390×844 | 채움 {colors.canvas} | 반경: 0px | -
- 상단 탭 트랙 | segmented-control | 16, 56, 358×44 | 채움 {colors.canvas-soft} | 반경: 9999px | -
- 탭 칸 개요(선택됨) | segmented-control-active | 20, 60, 87×36 | 채움 {colors.canvas}, 글자 {colors.ink} {typography.label}, box-shadow: none | 반경: 9999px | 개요
- 탭 칸 프롬프트·파일 | segmented-control | 107, 60, 87×36 | 글자 {colors.text-muted} {typography.label} | 반경: 9999px | 프롬프트·파일
- 탭 칸 사용 순서 | segmented-control | 194, 60, 87×36 | 글자 {colors.text-muted} {typography.label} | 반경: 9999px | 사용 순서
- 탭 칸 예시·주의 | segmented-control | 281, 60, 87×36 | 글자 {colors.text-muted} {typography.label} | 반경: 9999px | 예시·주의
- 권한 배지 | badge-overlay | 16, 116, 48×24 | 배지 스크림(회색 반투명), 글자 {colors.canvas} {typography.label} | 반경: 9999px | 유료
- 스킬명 | - | 16, 148, 358×65 | 글자 {colors.ink} {typography.heading-2}, 2줄 | 반경: 0px | 주간 보고서 초안 프롬프트: 지난주 실적과 이번 주 계획 정리
- 정보 행 카테고리 | - | 16, 225, 358×24 | 이름 {colors.text-muted} {typography.caption}, 값 {colors.ink} {typography.body} | 반경: 0px | 카테고리 / 문서 작성
- 정보 행 난이도 | - | 16, 249, 358×24 | 이름 {colors.text-muted} {typography.caption}, 값 {colors.ink} {typography.body} | 반경: 0px | 난이도 / 중급
- 정보 행 추천 대상 | - | 16, 273, 358×24 | 이름 {colors.text-muted} {typography.caption}, 값 {colors.ink} {typography.body} | 반경: 0px | 추천 대상 / 주간 보고를 쓰는 팀원
- 정보 행 사용 도구 | - | 16, 297, 358×24 | 이름 {colors.text-muted} {typography.caption}, 값 {colors.ink} {typography.body} | 반경: 0px | 사용 도구 / Claude
- 정보 행 언제 쓰나요? | - | 16, 321, 358×24 | 이름 {colors.text-muted} {typography.caption}, 값 {colors.ink} {typography.body} | 반경: 0px | 언제 쓰나요? / 금요일 오후 주간 보고를 작성할 때
- 정보 행 준비물 | - | 16, 345, 358×24 | 이름 {colors.text-muted} {typography.caption}, 값 {colors.ink} {typography.body} | 반경: 0px | 준비물 / 이번 주 업무 기록
- 정보 행 업데이트 날짜 | - | 16, 369, 358×24 | 이름 {colors.text-muted} {typography.caption}, 값 {colors.ink} {typography.body} | 반경: 0px | 업데이트 날짜 / 2026.09.21
- 잠금 가림 영역 | ex-empty-state-card | 16, 441, 358×224 | 채움 {colors.canvas-soft}, 가운데 정렬 | 반경: 24px | -
- 가림 영역 제목 1 | ex-empty-state-card | 40, 465, 150×20 | 글자 {colors.text-muted} {typography.body-sm} | 반경: 0px | 프롬프트·파일
- 가림 영역 제목 2 | ex-empty-state-card | 200, 465, 150×20 | 글자 {colors.text-muted} {typography.body-sm}, 오른쪽 정렬 | 반경: 0px | 예시 결과
- 자리표시 막대 1 | ex-empty-state-card | 40, 497, 310×16 | 채움 {colors.field} | 반경: 16px | -
- 자리표시 막대 2 | ex-empty-state-card | 40, 521, 310×16 | 채움 {colors.field} | 반경: 16px | -
- 자리표시 막대 3 | ex-empty-state-card | 40, 545, 220×16 | 채움 {colors.field} | 반경: 16px | -
- 자물쇠 아이콘 | ex-empty-state-card | 179, 577, 32×32 | 단색 {colors.ink}, 채움 없음 | 반경: 0px | 자물쇠 아이콘
- 안내 문구 | ex-empty-state-card | 40, 617, 310×24 | 글자 {colors.ink} {typography.title}, 가운데 정렬 | 반경: 0px | 이 스킬은 유료 멤버가 사용할 수 있어요
- 하단 고정 행동 바 | nav-pill | 16, 772, 358×56 | 채움 {colors.canvas-soft} | 반경: 9999px | -
- 유료 멤버 알아보기 | button-primary | 24, 780, 342×40 | 채움 {colors.primary}, 글자 {colors.canvas} {typography.link} | 반경: 9999px | 유료 멤버 알아보기

프레임 아래로 이어지는 스크롤 구획(프레임 밖, 좌표 없음): 잠금 가림 영역 아래 {spacing.section} 간격 뒤에 "관련 미션" 제목({typography.heading-4})과 가로 스크롤 pricing-card 1장 이상(반경: 24px), 맨 아래 여백 {spacing.section-lg}.
복사·다운로드 동작은 없고 하단 행동은 하나뿐이다. guest 회원이면 같은 자리 문구가 "가입하기"로 바뀐다.
