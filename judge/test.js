#!/usr/bin/env node
'use strict';
// 하네스 검증 (harness-verification.md): node judge/test.js
// 1) 통과 샘플이 모든 게이트를 통과하는지  2) 실패 샘플이 게이트마다 기대한 규칙에 걸리는지
// 3) tools/state.js의 재개·복귀 규칙  ※ 실제 work/는 건드리지 않고 임시 폴더에서만 돌린다.

const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');

const repo = path.resolve(__dirname, '..');
const fixture = path.join(__dirname, 'fixtures', 'pass');
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'harness-test-'));
const ID = 'my-assets';
let pass = 0, fail = 0, n = 0;

function ok(name, cond, extra) {
  if (cond) { pass++; console.log('  ✓ ' + name); }
  else { fail++; console.log('  ✗ ' + name + (extra ? '  → ' + extra : '')); }
}
function judge(root, gate) {
  const r = spawnSync('node', [path.join(repo, 'judge', 'judge.js'), ID, gate, '--root', root], { encoding: 'utf8' });
  let j = null; try { j = JSON.parse(r.stdout); } catch (e) { /* */ }
  return { code: r.status, json: j, err: r.stderr };
}
function fresh() {
  const root = path.join(tmp, 'c' + (++n));
  fs.cpSync(fixture, path.join(root, ID), { recursive: true });
  return root;
}
const p = (root, rel) => path.join(root, ID, rel);
const edit = (root, rel, fn) => fs.writeFileSync(p(root, rel), fn(fs.readFileSync(p(root, rel), 'utf8')));

console.log('\n[1] 통과 샘플: 모든 게이트 통과');
for (const g of ['INPUT', 'G1', 'G2', 'G3', 'G4', 'G5']) {
  const r = judge(fresh(), g);
  ok(`${g} 통과 (종료 코드 0)`, r.code === 0 && r.json && r.json.pass, r.json && JSON.stringify(r.json.failures));
}

console.log('\n[2] 실패 샘플: 기대한 규칙에 걸리는지');
const cases = [
  // [설명, 게이트, 기대 규칙, 변형]
  ['G1: 레퍼런스 파일명 미언급', 'G1', 'G1-1', r => edit(r, '01-analysis.md', t => t.split('uibowl-02.txt').join('other.txt'))],
  ['G1: 반영 항목 2개', 'G1', 'G1-2', r => edit(r, '01-analysis.md', t => t.replace(/^- \[A-3\].*$/m, ''))],
  ['G1: PRD 절(§) 없음', 'G1', 'G1-2', r => edit(r, '01-analysis.md', t => t.split('§6-5').join('PRD'))],
  ['G1: MVP 제외 키워드(구매)', 'G1', 'G1-3', r => edit(r, '01-analysis.md', t => t.replace('새 자산 등록으로 안내한다', '구매 안내를 붙인다'))],
  ['G2: 필수 섹션 누락', 'G2', 'G2-1', r => edit(r, '02-screen-spec.md', t => t.replace('## 빈·오류 상태', '## 상태'))],
  ['G2: PRD §8 밖 필드(Purchase.price)', 'G2', 'G2-2', r => edit(r, '02-screen-spec.md', t => t + '- Purchase.price\n')],
  ['G2 ★S-B: 공개 범위 기본값이 비공개가 아님', 'G2', 'S-B-1', r => edit(r, '02-screen-spec.md', t => t.replace('기본값: 비공개', '기본값: 전체 공개'))],
  ['G2 ★S-B: 판매 신청 노출 조건 누락', 'G2', 'S-B-2', r => edit(r, '02-screen-spec.md', t => t.replace(/^- 판매 신청 노출 조건.*$/m, ''))],
  ['G2 ★S-B: 판매 중 문구', 'G2', 'S-B-3', r => edit(r, '02-screen-spec.md', t => t + '\n검수 전에도 판매 중 배지를 보여 준다\n')],
  ['G2 ★S-A: 저작권 확인 항목 누락', 'G2', 'S-A-1', r => edit(r, '02-screen-spec.md', t => t.replace(/^- 확인 항목: 저작권.*$/m, ''))],
  ['G2 ★S-A: 더미에 이메일', 'G2', 'S-A-2', r => edit(r, '02-screen-spec.md', t => t + '\n예시: kim@example.com\n')],
  ['G3: 키스크린 4개', 'G3', 'G3-1', r => edit(r, '03-keyscreens.md', t => t + '\n## 키스크린 3: a\n프레임: 390×844\n\n## 키스크린 4: b\n프레임: 390×844\n')],
  ['G3: 프레임 375×812', 'G3', 'D-04', r => edit(r, '03-keyscreens.md', t => t.replace('390×844', '375×812'))],
  ['G3: 프레임 표기 없음', 'G3', 'D-04', r => edit(r, '03-keyscreens.md', t => t.replace(/^프레임: 390×844\n/m, ''))],
  ['G3: 반경 12px', 'G3', 'D-01', r => edit(r, '03-keyscreens.md', t => t.replace('자산 카드 반경: 24px', '자산 카드 반경: 12px'))],
  ['G4: tokens radius 12', 'G4', 'G4-1', r => edit(r, '04-design/tokens.json', t => t.replace('"sm": 16', '"sm": 12'))],
  ['G4: tokens 허용 밖 색', 'G4', 'G4-1', r => edit(r, '04-design/tokens.json', t => t.replace('#f3f3f3', '#ff0000'))],
  ['G4: design.md에 없는 컴포넌트(ex-modal-card)', 'G4', 'G4-2', r => edit(r, '04-design/components.md', t => t + '- `ex-modal-card` 반경: 24px\n')],
  ['G4: screen-design에 hex 직접 사용', 'G4', 'G4-3', r => edit(r, '04-design/screen-design.md', t => t + '\n- 강조색 #ff0000\n')],
  ['G5: accent 3곳', 'G5', 'D-03', r => edit(r, '04-design/screen-design.md', t => t + '\n- 알림 점: {colors.accent}\n- 통계 숫자: {colors.accent}\n')],
  ['G5: CTA에 accent', 'G5', 'D-03', r => edit(r, '04-design/screen-design.md', t => t.replace('채움 {colors.primary}', '채움 {colors.accent}'))],
  ['G5: 버튼 반경 8px', 'G5', 'D-02', r => edit(r, '04-design/components.md', t => t.replace('`button-outline` 반경: 9999px', '`button-outline` 반경: 16px'))],
  ['G5: 배지에 rounded.md', 'G5', 'D-02', r => edit(r, '04-design/components.md', t => t + '- `badge-popular` {rounded.md}\n')],
  ['G5: 카드에 box-shadow', 'G5', 'D-05', r => edit(r, '04-design/screen-design.md', t => t.replace('box-shadow: none', 'box-shadow: 0 4px 8px'))],
  ['G5: 산출물 파일 없음', 'G5', 'G5-1', r => fs.rmSync(p(r, '04-design/components.md'))],
  ['G5 ★S-B 재검: 화면 디자인에 판매 중', 'G5', 'S-B-3', r => edit(r, '04-design/screen-design.md', t => t + '\n- 상태 배지: 판매 중\n')],
  ['G5 ★S-A 재검: 화면 디자인에 전화번호', 'G5', 'S-A-2', r => edit(r, '04-design/screen-design.md', t => t + '\n- 예시: 010-1234-5678\n')],
  ['INPUT: 레퍼런스 없음', 'INPUT', 'INPUT', r => { for (const f of fs.readdirSync(p(r, '00-input/refs'))) fs.rmSync(p(r, '00-input/refs/' + f)); }]
];
for (const [name, gate, rule, mutate] of cases) {
  const root = fresh(); mutate(root);
  const r = judge(root, gate);
  const hit = r.json && r.json.failures.some(f => f.rule === rule);
  ok(`${name} → ${rule}`, r.code === 1 && hit, r.json ? JSON.stringify(r.json.failures.map(f => f.rule)) : r.err);
}
{
  const root = fresh();
  edit(root, 'state.json', t => t.replace('"approved"', '"pending"'));
  const r = judge(root, 'G3');
  ok('G3: 사람 승인 없음 → G3-4, waiting_human=true', r.code === 1 && r.json.failures.some(f => f.rule === 'G3-4') && r.json.waiting_human === true);
  edit(root, '03-keyscreens.md', t => t.replace('390×844', '375×812'));
  const r2 = judge(root, 'G3');
  ok('G3: 기계 조건도 실패하면 waiting_human=false', r2.json.waiting_human === false);
}
{
  const r = judge(fresh(), 'G9');
  ok('알 수 없는 게이트는 종료 코드 2', r.code === 2);
}

console.log('\n[3] state.js: 재개·복귀 규칙');
const sroot = path.join(tmp, 'state');
const st = (...a) => { const r = spawnSync('node', [path.join(repo, 'tools', 'state.js'), ...a, '--root', sroot], { encoding: 'utf8', input: a._in || '' }); return r; };
const rec = (gate, obj) => spawnSync('node', [path.join(repo, 'tools', 'state.js'), 'record', ID, gate, '--root', sroot], { encoding: 'utf8', input: JSON.stringify(obj) });
const next = () => JSON.parse(st('next', ID).stdout);
const state = () => JSON.parse(fs.readFileSync(path.join(sroot, ID, 'state.json'), 'utf8'));
const PASS = { pass: true, waiting_human: false, failures: [] };
const FAIL = { pass: false, waiting_human: false, failures: [{ rule: 'X', detail: 'x' }] };
const WAIT = { pass: false, waiting_human: true, failures: [{ rule: 'G3-4', detail: '사람 승인 상태: pending' }] };

st('init', ID);
ok('init 직후 S1부터 실행', next().action === 'run' && next().stage === 'S1');
ok('init 재실행은 거부(덮어쓰기 방지)', st('init', ID).status === 2);
rec('INPUT', { pass: false, failures: [{ rule: 'INPUT', detail: 'refs 없음' }] });
ok('입력 누락이면 사람에게 멈춤', next().action === 'stop');
rec('INPUT', PASS);
rec('G1', PASS); rec('G2', PASS);
ok('S2 끝에서 멈춘 뒤 이어서 → S3부터 재개', next().action === 'run' && next().stage === 'S3');
rec('G3', WAIT);
ok('G3 승인 대기는 실패 횟수에 안 세고 사람 대기', next().action === 'wait_human' && state().gates.G3.attempts === 0);
st('approve', ID);
rec('G3', PASS);
ok('승인 후 G3 통과 → S4', next().action === 'run' && next().stage === 'S4');
rec('G4', FAIL);
ok('G4 1회 실패 → 같은 단계 재작업', next().action === 'run' && next().stage === 'S4' && next().retry === 1);
rec('G4', FAIL);
ok('같은 단계 2번 연속 실패 → 사람에게 멈춤', next().action === 'stop');
st('retry', ID);
ok('retry 후 다시 실행 가능', next().action === 'run');
rec('G4', PASS);
rec('G5', FAIL);
ok('G5 위반 → S4로 복귀, G4는 재통과 필요', next().stage === 'S4' && state().gates.G4.status === 'pending');
rec('G4', PASS); rec('G5', PASS);
ok('G5 통과 → done', next().action === 'done');
st('reject', ID, '톤이 다름');
ok('G3 반려 → S3으로 복귀, G3~G5 초기화', next().stage === 'S3' && state().gates.G5.status === 'pending' && state().human_approval.status === 'rejected');
rec('G3', WAIT);
ok('반려 후 재작업한 S3도 새 승인 대기로 처리', next().action === 'wait_human');
st('block', ID, 'design.md와 rules.json 충돌');
ok('규칙 충돌 block → 사람에게 멈춤', next().action === 'stop');

fs.rmSync(tmp, { recursive: true, force: true });
console.log(`\n결과: ${pass} 통과, ${fail} 실패`);
process.exit(fail ? 1 : 0);
