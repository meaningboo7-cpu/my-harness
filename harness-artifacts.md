# 하네스 산출물 (R4)

## 파일 구조

화면 1개당 폴더 하나를 씁니다. `<screen-id>`는 영문 kebab-case입니다(예: `home`, `skill-library`, `asset-review`).

```
work/<screen-id>/
  00-input/            사람이 넣음: refs/(레퍼런스), screen.txt(화면 이름)
  01-analysis.md       S1 레퍼런스 분석
  02-screen-spec.md    S2 화면 설계 문서
  03-keyscreens.md     S3 키스크린 스펙
  04-design/           S4: tokens.json, components.md, screen-design.md
  05-review.md         S5 가이드 검수 결과
  state.json           재개용
rules.json             규칙 SSOT (work/ 밖, 전 화면 공용)
```

## 규칙 SSOT: rules.json

- 스크립트가 읽는 규칙은 이 파일 하나에만 둔다.
- 형식은 JSON이고, 규칙마다 아래 필드를 가진다.

| 필드 | 뜻 |
|---|---|
| `id` | 규칙 번호 (예: `D-01`, `S-A`) |
| `description` | 규칙 설명 |
| `how_to_count` | 세는 방법 (스크립트가 그대로 실행 가능한 형태) |
| `allowed` | 허용값 또는 허용 개수 |
| `source` | 출처: design.md 절 또는 story-service A·B |

- 시작 규칙은 R0에서 정한 디자인 규칙 4개다.
  - `D-01` 모서리 반경은 0px / 16px / 24px / 9999px만 허용
  - `D-02` 버튼·배지·토글의 반경이 9999px이 아니면 실패
  - `D-03` accent(#0066ff)는 화면당 2곳 이하, CTA에는 0곳
  - `D-04` 키스크린 프레임은 390×844만 허용
- 서비스 규칙 A·B(`S-A`, `S-B`)의 세는 방법은 R5에서 정한다.

## 재개 가능 여부

- 중간에 멈춘 뒤 이어서 돌릴 수 있다.
- `state.json`에 현재 단계, 각 게이트 결과, 단계별 실패 횟수를 적는다.
- 통과한 단계의 산출물은 재사용하고, 입력이 바뀌면 그 단계부터 다시 한다.

## 쓰기 권한

- 산출물(01~05)과 `state.json`은 같은 화면 폴더에 둔다.
- 에이전트는 자기 단계 산출물만 쓴다.
- `state.json`은 오케스트레이터만 갱신한다.
