# 하네스 오케스트레이터 (R7)

오케스트레이터는 메인 Claude이고, CLAUDE.md로 정의합니다.

## 실행 순서

단계마다 이 순서로 움직입니다.

1. 에이전트를 호출한다.
2. `judge/judge.js <screen-id> <gate>`를 실행한다.
3. 통과하면 `state.json`을 갱신하고 다음 단계로 간다.
4. 실패하면 실패 조건을 `state.json`에 기록하고 같은 단계를 재작업한다.

게이트를 건너뛰거나 임의로 통과 처리하는 일은 없다.

## state.json 필드

| 필드 | 뜻 |
|---|---|
| `screen_id` | 처리 중인 화면 |
| `current_stage` | S1~S5 |
| `gates` | G1~G5 각각 `status`, `attempts`, `last_failures` |
| `human_approval` | `status`, `date`, `reason` (G3 사람 승인) |

## 사람에게 멈추는 조건

1. 같은 단계에서 2번 연속 실패
2. G3 승인 대기
3. 입력 누락 (`refs/`가 비었거나 `screen.txt`가 없음)
4. 규칙 충돌 (design.md와 `rules.json`이 서로 어긋남)

## CLAUDE.md의 형태

- 60줄 이내로 둔다.
- 상단에서 `@story-service.md`, `@story-work.md`, `@harness-*.md`를 참조한다.
- 본문에는 실행 순서, 트리거, 금지 사항만 적는다.

## 금지 사항

1. prd.md, design.md, `rules.json` 수정 금지
2. 에이전트가 `judge/` 스크립트 수정 금지
3. 게이트 임의 통과 금지
4. 자기 편집 경로 밖의 파일 쓰기 금지
