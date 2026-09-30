# 하네스 역할 (R6)

## 역할과 편집 범위

| 역할 | 맡는 단계 | 편집 가능 경로 (이것만) |
|---|---|---|
| analyst | S1 | `work/<screen-id>/01-analysis.md` |
| planner | S2 | `work/<screen-id>/02-screen-spec.md` |
| keyscreen | S3 | `work/<screen-id>/03-keyscreens.md` |
| designer | S4 | `work/<screen-id>/04-design/` |
| judge (읽기 전용) | 모든 게이트, S5 | 없음 (`work/`, `rules.json`, design.md 읽기만) |
| 오케스트레이터 (메인 Claude) | 전체 진행 | `state.json`만 갱신 |

- S1~S3은 파일 1개, S4만 폴더다.
- 다른 에이전트의 산출물이나 `rules.json`, design.md를 고치면 실패로 본다.
- S5의 검토 결과 `05-review.md`는 judge 스크립트의 출력을 오케스트레이터가 기록한다.

## 판정자와 스크립트

- Node 스크립트 `judge/judge.js <screen-id> <gate>` 하나를 쓴다.
- 통과하면 종료 코드 0, 실패하면 1이고, 실패한 조건 목록을 JSON으로 출력한다.
- 판정자는 이 스크립트를 실행하고 결과를 읽기만 한다.

## 자연어 트리거

| 말 | 동작 |
|---|---|
| "`<screen-id>` 하네스 돌려줘" | 처음부터 시작 |
| "`<screen-id>` 이어서" | `state.json`을 읽어 멈춘 단계부터 재개 |
| "`<screen-id>` 승인" / "`<screen-id>` 반려: 사유" | G3 사람 승인 기록 |

## G3 사람 승인 기록

- 사용자가 내부 관계자 협의를 마친 뒤 위 "승인/반려" 문장으로 전달한다.
- 오케스트레이터가 `state.json`에 승인 여부와 날짜를 기록한다.
