# 허들링 디자인 하네스

화면 1개를 받아 레퍼런스 분석 → 화면 설계 → 키스크린 스펙 → 토큰·컴포넌트·화면 디자인 → 가이드 검수까지
진행한다. 완료 기준: 선택한 화면마다 컨펌된 키스크린 2~3개가 있고, design.md 위반이 0건.

## 참조 (세부는 여기서 읽는다)
@story-service.md  판정 기준: 유저스토리, 어기면 안 되는 것 A·B
@story-work.md     작업 흐름: 산출물·게이트·경계
@harness-context.md @harness-purpose.md @harness-pipeline.md
@harness-artifacts.md @harness-gates.md @harness-roles.md
@harness-orchestrator.md @harness-verification.md
두 story 문서는 섞지 않는다. prd.md, design.md는 읽기 전용 원본이다.

## 파이프라인
S1 레퍼런스 분석 → S2 화면 설계 → S3 키스크린 스펙(390×844, 2~3개)
→ S4 토큰·컴포넌트·화면 디자인 → S5 가이드 검수
각 단계 끝에 게이트 G1~G5. 한 번에 화면 1개, 산출물은 work/<screen-id>/.
레퍼런스 수집(uibowl)과 Figma에 그리는 일은 사람이 한다.

## 실행 순서 (단계마다)
시작 전: `node tools/state.js init <id>` → 사람이 00-input/에 screen.txt와 refs/ 넣음 → INPUT 판정
1. 에이전트 호출  2. `node judge/judge.js <id> <gate>` 실행 (judge 에이전트)
3. `... | node tools/state.js record <id> <gate>` 로 기록. 통과 → 다음 단계, 실패 → 같은 단계 재작업
매 턴 `node tools/state.js next <id>`가 말하는 행동만 한다. 게이트를 건너뛰거나 임의로 통과 처리하지 않는다.

## 역할과 편집 경로 (.claude/agents/)
- analyst: 01-analysis.md / planner: 02-screen-spec.md
- keyscreen: 03-keyscreens.md / designer: 04-design/
- judge: 읽기 전용 (스크립트 실행·결과 전달만)
- 오케스트레이터(나): state.json만 갱신 (tools/state.js로). 05-review.md는 G5 결과를 기록

## 트리거
- "<screen-id> 하네스 돌려줘": 처음부터
- "<screen-id> 이어서": `state.js next`가 가리키는 단계부터 재개
- "<screen-id> 승인" / "<screen-id> 반려: 사유": `state.js approve|reject`로 G3 기록

## 게이트 요약
G1 분석 / G2 화면 설계(★ S-A·S-B: 기본 비공개, 검수 전 "판매 중" 금지, 개인정보 확인 항목 4개)
G3 키스크린 + 사람 승인(내부 관계자) / G4 토큰·컴포넌트 / G5 rules.json 전체 위반 0건
통과 조건 전문은 @harness-gates.md. 규칙 값은 rules.json 한 곳에만 둔다.
실패 복귀: 같은 단계 재작업, G3 반려는 S3, G5 위반은 S4.

## 사람에게 멈추는 조건
같은 단계 2번 연속 실패 / G3 승인 대기 / 입력 누락(refs/ 비었거나 screen.txt 없음)
/ design.md와 rules.json 충돌 (`state.js block`으로 기록)
멈추면 실패 목록과 함께 사람에게 물어본다. 사람이 확인하면 `state.js retry`로 재개한다.

## 금지
- prd.md, design.md, rules.json 수정
- 에이전트가 judge/ 스크립트 수정
- 게이트 임의 통과
- 자기 편집 경로 밖의 파일 쓰기

## 검증
`node judge/test.js` (샘플 테스트 + 재개 규칙). judge/·rules.json·tools/를 고친 뒤에는 반드시 돌린다.
