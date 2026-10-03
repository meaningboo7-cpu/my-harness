# 키스크린: my-assets

## 키스크린 1: 내 자산 목록 (seller)
프레임: 390×844

- 사용 컴포넌트: segmented-control, segmented-control-active, pricing-card, badge-overlay, button-primary, nav-pill
- 화면 배경: `{colors.canvas}`, 좌우 여백 `{spacing.md}`, 섹션 간격 `{spacing.section}`, box-shadow: none
- 화면 제목 "내 자산": `{typography.heading-1}`, 글자색 `{colors.ink}`
- 공개 범위 필터(비공개 / 멤버 공개 / 판매 신청): segmented-control, 트랙 `{colors.canvas-soft}`, 반경: 9999px
  - 선택된 항목은 segmented-control-active, 흰 필 `{colors.canvas}`, 라벨 `{typography.link}` `{colors.ink}`, 반경: 9999px
  - 선택되지 않은 항목 라벨은 `{colors.text-muted}`
  - 판매 신청 항목은 seller에게만 보인다. seller가 아닌 회원에게는 항목 자체가 없어 2개 항목이 된다.
  - 02-screen-spec.md A-1의 텍스트 탭은 design.md 컴포넌트에 없으므로, 같은 역할(공개 범위별 목록 전환)을 하는 segmented-control(필 형태)로 옮겼다.
- 자산 카드 목록(판매 신청 항목 선택 상태, 카드 3장 세로 배치, 카드 간격 `{spacing.sm}`): pricing-card 형태를 따른다
  - 카드 채움 `{colors.canvas}`, 1px `{colors.hairline-soft}` 외곽선, 반경: 24px, 안쪽 여백 `{spacing.lg}`, box-shadow: none
  - 자산 이름(예: "회의록 요약 프롬프트"): `{typography.title}`, `{colors.ink}`
  - 유형(예: "프롬프트"): `{typography.body-sm}`, `{colors.text-muted}`
  - 공개 범위(예: "판매 신청"): `{typography.caption}`, `{colors.text-muted}`
  - 카드 우측 상태 표시: badge-overlay 형태의 필 배지, 반경: 9999px, 라벨 `{typography.label}` `{colors.on-primary}`, 배경은 badge-overlay의 회색 반투명 스크림. accent는 쓰지 않는다.
  - 상태 표시 값은 임시저장, 검수 대기, 수정 요청, 승인됨, 반려 중 하나이며 승인됨이 최종 상태다. 이 화면 예시는 카드 1 "검수 대기", 카드 2 "수정 요청", 카드 3 "승인됨"으로 보여준다.
  - 수정 요청 카드는 수정 후 다시 신청할 수 있고, 반려 중 카드는 상태만 표시한다.
- 새 자산 등록 진입: button-primary "새 자산 등록", 목록 아래 전체 너비 고정 높이 필, 채움 `{colors.primary}`, 라벨 `{colors.on-primary}` `{typography.link}`, 반경: 9999px
- 하단 탭바: nav-pill 형태, 화면 하단에 떠 있는 중앙 정렬 필 바, 채움 `{colors.canvas-soft}`, 반경: 9999px, box-shadow: none
  - "내 자산" 탭이 현재 위치이며 아이콘과 라벨을 `{colors.ink}` `{typography.label}`로 강조하고, 나머지 탭은 `{colors.text-muted}`
  - 탭은 MVP 1차 필수 기능 범위 안에서만 구성한다.

## 키스크린 2: 판매 신청 폼 (seller)
프레임: 390×844

- 사용 컴포넌트: text-input, text-input-focused, faq-row, button-primary, button-outline, badge-overlay
- 화면 배경: `{colors.canvas}`, 좌우 여백 `{spacing.md}`, box-shadow: none
- 화면 제목 "판매 신청": `{typography.heading-1}`, `{colors.ink}`
- 제목 입력: text-input, 채움 `{colors.field}`, 테두리 없음, 반경: 16px, 안쪽 여백 `{spacing.sm} {spacing.md}`, 플레이스홀더 `{colors.text-faint}`. 포커스 시 text-input-focused(2px `{colors.ink}` 링)
- 설명 입력: text-input, 같은 규칙, 반경: 16px
- 파일 첨부 행: text-input 형태 행, 채움 `{colors.field}`, 반경: 16px, 첨부 파일명은 `{typography.body}` `{colors.ink}`
  - 제출 완료된 제출물에서 전환해 들어오면 제목, 설명, 파일이 채워진 상태로 시작한다.
- 공개 범위 선택 행: 설정 화면 행 패턴(왼쪽 라벨 "공개 범위", 오른쪽 현재 값과 화살표), faq-row 형태, 채움 `{colors.canvas-soft}`, 반경: 16px, 라벨 `{typography.body}` `{colors.ink}`, 값 `{colors.text-muted}`
  - 공개 범위 기본값: 비공개
  - 선택지는 비공개, 멤버 공개, 판매 신청 3개이다.
  - 판매 신청 노출 조건: seller
  - seller가 아닌 회원에게는 판매 신청 선택지를 잠금 상태로도 보여주지 않고 아예 노출하지 않는다. 판매 신청은 seller만 할 수 있고 노출 조건도 seller이기 때문이다.
  - 이 화면은 seller 기준이므로 판매 신청을 고른 상태로 확인 항목이 나타난 모습을 보여준다.
- 확인 항목 4개(판매 신청을 고른 경우에만 표시): 각 항목은 faq-row 형태, 채움 `{colors.canvas-soft}`, 반경: 16px, 행 간격 `{spacing.sm}`, 라벨 `{typography.body}` `{colors.ink}`, 왼쪽에 체크 표시(원형 토글, 반경: 9999px)
  - 확인 항목: 개인정보가 없음
  - 확인 항목: 고객정보가 없음
  - 확인 항목: 회사기밀이 없음
  - 확인 항목: 저작권 문제가 없음
  - 체크한 표시는 `{colors.ink}` 채움과 `{colors.on-primary}` 체크, 체크하지 않은 표시는 `{colors.hairline}` 1px 테두리
  - 4개를 모두 체크해야 신청 버튼이 활성화된다. 하나라도 빠지면 신청 버튼은 비활성화되고 누락된 항목 옆에 `{typography.caption}` `{colors.text-muted}` 안내 "확인이 필요해요"를 표시한다.
- 하단 버튼 줄(고정 높이 필 2개, 간격 `{spacing.sm}`):
  - button-primary "판매 신청": 활성 시 채움 `{colors.primary}`, 라벨 `{colors.on-primary}` `{typography.link}`, 반경: 9999px. 비활성 시 채움 `{colors.canvas-soft}`, 라벨 `{colors.text-faint}`
  - button-outline "임시저장": 채움 `{colors.canvas}`, 1px `{colors.hairline}` 테두리, 라벨 `{colors.ink}`, 반경: 9999px
- 신청 후 상태: 목록의 카드에 badge-overlay 필 배지 "검수 대기"(반경: 9999px)가 붙는다.
- 실패 시: 입력한 내용을 유지한 채 `{typography.body-sm}` 실패 안내를 보여주고 다시 시도할 수 있게 한다.

## 키스크린 3: 빈 상태 (paid, 판매 신청 옵션 없음)
프레임: 390×844

- 사용 컴포넌트: segmented-control, segmented-control-active, ex-empty-state-card, button-primary, nav-pill
- 화면 배경: `{colors.canvas}`, 좌우 여백 `{spacing.md}`, box-shadow: none
- 화면 제목 "내 자산": `{typography.heading-1}`, `{colors.ink}`
- 공개 범위 필터: segmented-control, 트랙 `{colors.canvas-soft}`, 반경: 9999px. 항목은 비공개 / 멤버 공개 2개뿐이며 판매 신청 항목은 없다(paid는 seller가 아니므로). 선택된 "비공개"는 segmented-control-active, 흰 필 `{colors.canvas}`, 반경: 9999px
- 빈 상태 카드: ex-empty-state-card, 화면 중앙, 채움 `{colors.canvas-soft}`, 반경: 24px, 안쪽 여백 `{spacing.lg}`, box-shadow: none
  - 중앙 아이콘: `{colors.text-muted}` 단색, 색 채움 없음
  - 안내 문구 "아직 등록한 자산이 없어요": `{typography.heading-4}`, `{colors.ink}`
  - 보조 문구 "직접 만든 프롬프트나 제출물을 자산으로 등록해 보세요": `{typography.body-sm}`, `{colors.text-muted}`
- 새 자산 등록: button-primary, 카드 아래 전체 너비 고정 높이 필, 채움 `{colors.primary}`, 라벨 `{colors.on-primary}` `{typography.link}`, 반경: 9999px
- 공개 범위 기본값: 비공개. 등록 폼의 공개 범위 선택지에는 비공개와 멤버 공개만 보이고, 판매 신청 선택지는 노출하지 않는다(판매 신청 노출 조건: seller).
- 하단 탭바: nav-pill 형태, 채움 `{colors.canvas-soft}`, 반경: 9999px, "내 자산" 탭을 `{colors.ink}`로 강조
