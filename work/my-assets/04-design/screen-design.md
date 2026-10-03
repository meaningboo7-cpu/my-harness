프레임: 390×844

# 화면 설계: my-assets

색은 모두 토큰 참조. 그림자는 box-shadow: none만 사용한다.

## 키스크린 1: 내 자산 목록 (seller)
box-shadow: none. 판매 신청 항목을 선택한 상태.

- 화면 배경 | - | 0, 0, 390×844 | 채움 {colors.canvas} | 반경: 0px | -
- 화면 제목 | - | 16, 64, 358×36 | 글자 {colors.ink} {typography.heading-1} | 반경: 0px | 내 자산
- 공개 범위 필터 트랙 | segmented-control | 16, 116, 358×44 | 채움 {colors.canvas-soft} | 반경: 9999px | -
- 필터 항목 비공개 | segmented-control | 20, 120, 116×36 | 글자 {colors.text-muted} {typography.link} | 반경: 9999px | 비공개
- 필터 항목 멤버 공개 | segmented-control | 136, 120, 116×36 | 글자 {colors.text-muted} {typography.link} | 반경: 9999px | 멤버 공개
- 필터 항목 판매 신청(선택됨) | segmented-control-active | 252, 120, 116×36 | 채움 {colors.canvas}, 글자 {colors.ink} {typography.link} | 반경: 9999px | 판매 신청
- 자산 카드 1 | pricing-card | 16, 180, 358×120 | 채움 {colors.canvas}, 1px {colors.hairline-soft} 외곽선 | 반경: 24px | -
- 카드 1 자산 이름 | pricing-card | 40, 204, 230×24 | 글자 {colors.ink} {typography.title} | 반경: 0px | 회의록 요약 프롬프트
- 카드 1 유형 | pricing-card | 40, 232, 230×20 | 글자 {colors.text-muted} {typography.body-sm} | 반경: 0px | 프롬프트
- 카드 1 공개 범위 | pricing-card | 40, 256, 230×17 | 글자 {colors.text-muted} {typography.caption} | 반경: 0px | 판매 신청
- 카드 1 상태 표시 | badge-overlay | 278, 204, 72×24 | 배지 스크림(회색 반투명), 글자 {colors.canvas} {typography.label} | 반경: 9999px | 검수 대기
- 자산 카드 2 | pricing-card | 16, 312, 358×120 | 채움 {colors.canvas}, 1px {colors.hairline-soft} 외곽선 | 반경: 24px | -
- 카드 2 자산 이름 | pricing-card | 40, 336, 230×24 | 글자 {colors.ink} {typography.title} | 반경: 0px | 고객 문의 분류 스킬
- 카드 2 유형 | pricing-card | 40, 364, 230×20 | 글자 {colors.text-muted} {typography.body-sm} | 반경: 0px | 스킬 파일
- 카드 2 공개 범위 | pricing-card | 40, 388, 230×17 | 글자 {colors.text-muted} {typography.caption} | 반경: 0px | 판매 신청
- 카드 2 상태 표시 | badge-overlay | 278, 336, 72×24 | 배지 스크림(회색 반투명), 글자 {colors.canvas} {typography.label} | 반경: 9999px | 수정 요청
- 자산 카드 3 | pricing-card | 16, 444, 358×120 | 채움 {colors.canvas}, 1px {colors.hairline-soft} 외곽선 | 반경: 24px | -
- 카드 3 자산 이름 | pricing-card | 40, 468, 230×24 | 글자 {colors.ink} {typography.title} | 반경: 0px | 주간 보고 자동화 템플릿
- 카드 3 유형 | pricing-card | 40, 496, 230×20 | 글자 {colors.text-muted} {typography.body-sm} | 반경: 0px | 자동화 템플릿
- 카드 3 공개 범위 | pricing-card | 40, 520, 230×17 | 글자 {colors.text-muted} {typography.caption} | 반경: 0px | 판매 신청
- 카드 3 상태 표시 | badge-overlay | 278, 468, 72×24 | 배지 스크림(회색 반투명), 글자 {colors.canvas} {typography.label} | 반경: 9999px | 승인됨
- 새 자산 등록 | button-primary | 16, 588, 358×52 | 채움 {colors.primary}, 글자 {colors.canvas} {typography.link} | 반경: 9999px | 새 자산 등록
- 하단 탭바 | nav-pill | 45, 760, 300×64 | 채움 {colors.canvas-soft} | 반경: 9999px | -
- 탭 홈 | nav-pill | 65, 772, 120×40 | 글자 {colors.text-muted} {typography.label} | 반경: 9999px | 홈
- 탭 내 자산(현재) | nav-pill | 205, 772, 120×40 | 글자 {colors.ink} {typography.label} | 반경: 9999px | 내 자산

## 키스크린 2: 판매 신청 폼 (seller)
box-shadow: none. 판매 신청을 고른 상태. 공개 범위 기본값: 비공개(처음 열면 비공개이고, 이 화면은 판매 신청을 고른 모습). 판매 신청 선택지는 seller에게만 보인다. 확인 항목 4개 중 3개만 체크한 상태라 신청 버튼이 비활성이다.

- 화면 배경 | - | 0, 0, 390×844 | 채움 {colors.canvas} | 반경: 0px | -
- 화면 제목 | - | 16, 64, 358×36 | 글자 {colors.ink} {typography.heading-1} | 반경: 0px | 판매 신청
- 제목 입력 | text-input | 16, 116, 358×48 | 채움 {colors.field}, 글자 {colors.ink} {typography.body} | 반경: 16px | 회의록 요약 프롬프트
- 설명 입력 | text-input | 16, 176, 358×96 | 채움 {colors.field}, 글자 {colors.text-faint} {typography.body} | 반경: 16px | 설명을 입력해 주세요
- 파일 첨부 행 | text-input | 16, 284, 358×48 | 채움 {colors.field}, 글자 {colors.ink} {typography.body} | 반경: 16px | 회의록_요약_프롬프트.txt
- 공개 범위 선택 행 | faq-row | 16, 344, 358×48 | 채움 {colors.canvas-soft}, 라벨 {colors.ink} {typography.body}, 값 {colors.text-muted} | 반경: 16px | 공개 범위 (왼쪽 라벨) / 판매 신청 › (오른쪽 값과 화살표)
- 확인 항목 행 1 | faq-row | 16, 404, 358×48 | 채움 {colors.canvas-soft}, 글자 {colors.ink} {typography.body} | 반경: 16px | 개인정보가 없음
- 확인 항목 1 체크 표시 | - | 28, 416, 24×24 | 채움 {colors.ink}, 체크 {colors.canvas} | 반경: 9999px | 체크됨
- 확인 항목 행 2 | faq-row | 16, 464, 358×48 | 채움 {colors.canvas-soft}, 글자 {colors.ink} {typography.body} | 반경: 16px | 고객정보가 없음
- 확인 항목 2 체크 표시 | - | 28, 476, 24×24 | 채움 {colors.ink}, 체크 {colors.canvas} | 반경: 9999px | 체크됨
- 확인 항목 행 3 | faq-row | 16, 524, 358×48 | 채움 {colors.canvas-soft}, 글자 {colors.ink} {typography.body} | 반경: 16px | 회사기밀이 없음
- 확인 항목 3 체크 표시 | - | 28, 536, 24×24 | 채움 {colors.ink}, 체크 {colors.canvas} | 반경: 9999px | 체크됨
- 확인 항목 행 4 | faq-row | 16, 584, 358×48 | 채움 {colors.canvas-soft}, 글자 {colors.ink} {typography.body} | 반경: 16px | 저작권 문제가 없음
- 확인 항목 4 체크 표시 | - | 28, 596, 24×24 | 채움 {colors.canvas}, 1px {colors.hairline} 테두리 | 반경: 9999px | 체크 안 됨
- 확인 항목 4 안내 | - | 250, 598, 112×17 | 글자 {colors.text-muted} {typography.caption} | 반경: 0px | 확인이 필요해요
- 판매 신청 | button-primary | 16, 692, 358×52 | 비활성: 채움 {colors.canvas-soft}, 글자 {colors.text-faint} {typography.link} (활성 시 채움 {colors.primary}, 글자 {colors.canvas}) | 반경: 9999px | 판매 신청
- 임시저장 | button-outline | 16, 756, 358×52 | 채움 {colors.canvas}, 1px {colors.hairline} 테두리, 글자 {colors.ink} {typography.link} | 반경: 9999px | 임시저장

실패 시: 입력한 내용을 유지하고 {typography.body-sm} 실패 안내를 보여준 뒤 다시 시도할 수 있게 한다. 신청 후 목록 카드에는 검수 대기 상태가 붙는다.

## 키스크린 3: 빈 상태 (paid, 판매 신청 옵션 없음)
box-shadow: none. paid는 seller가 아니므로 필터는 2개 항목뿐이다. 공개 범위 기본값: 비공개. 등록 폼의 공개 범위 선택지에는 비공개와 멤버 공개만 있고 판매 신청 선택지는 노출하지 않는다.

- 화면 배경 | - | 0, 0, 390×844 | 채움 {colors.canvas} | 반경: 0px | -
- 화면 제목 | - | 16, 64, 358×36 | 글자 {colors.ink} {typography.heading-1} | 반경: 0px | 내 자산
- 공개 범위 필터 트랙 | segmented-control | 16, 116, 358×44 | 채움 {colors.canvas-soft} | 반경: 9999px | -
- 필터 항목 비공개(선택됨) | segmented-control-active | 20, 120, 173×36 | 채움 {colors.canvas}, 글자 {colors.ink} {typography.link} | 반경: 9999px | 비공개
- 필터 항목 멤버 공개 | segmented-control | 193, 120, 173×36 | 글자 {colors.text-muted} {typography.link} | 반경: 9999px | 멤버 공개
- 빈 상태 카드 | ex-empty-state-card | 16, 236, 358×200 | 채움 {colors.canvas-soft} | 반경: 24px | -
- 중앙 아이콘 | ex-empty-state-card | 165, 260, 60×60 | 단색 {colors.text-muted}, 채움 없음 | 반경: 0px | 상자 모양 아이콘
- 안내 문구 | ex-empty-state-card | 40, 336, 310×25 | 글자 {colors.ink} {typography.heading-4}, 가운데 정렬 | 반경: 0px | 아직 등록한 자산이 없어요
- 보조 문구 | ex-empty-state-card | 40, 369, 310×39 | 글자 {colors.text-muted} {typography.body-sm}, 가운데 정렬 | 반경: 0px | 직접 만든 프롬프트나 제출물을 자산으로 등록해 보세요
- 새 자산 등록 | button-primary | 16, 468, 358×52 | 채움 {colors.primary}, 글자 {colors.canvas} {typography.link} | 반경: 9999px | 새 자산 등록
- 하단 탭바 | nav-pill | 45, 760, 300×64 | 채움 {colors.canvas-soft} | 반경: 9999px | -
- 탭 홈 | nav-pill | 65, 772, 120×40 | 글자 {colors.text-muted} {typography.label} | 반경: 9999px | 홈
- 탭 내 자산(현재) | nav-pill | 205, 772, 120×40 | 글자 {colors.ink} {typography.label} | 반경: 9999px | 내 자산
