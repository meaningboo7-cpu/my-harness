#!/usr/bin/env node
'use strict';
// state.json 갱신 도구. 오케스트레이터(메인 Claude)만 사용한다. 에이전트와 judge는 쓰지 않는다.
//   node tools/state.js init <id>                 화면 폴더와 state.json 생성 (이미 있으면 거부)
//   node tools/state.js next <id>                 다음 행동을 JSON으로 출력 (재개 판단)
//   node tools/state.js record <id> <gate>        stdin으로 받은 judge JSON을 기록
//   node tools/state.js approve <id>              G3 사람 승인 기록
//   node tools/state.js reject <id> <사유...>     G3 반려 기록, S3으로 복귀
//   node tools/state.js retry <id>                2번 연속 실패로 멈춘 뒤 사람이 확인하고 재시도할 때 실패 횟수 초기화
//   node tools/state.js block <id> <사유...>      사람에게 멈춤 (예: design.md와 rules.json 충돌)
//   node tools/state.js unblock <id>
// 옵션: --root <dir> (기본 work/). 날짜는 HARNESS_DATE 환경변수로 고정할 수 있다.
// attempts = 해당 게이트의 "연속 실패 횟수" (통과하면 0으로 초기화).

const fs = require('fs');
const path = require('path');

const repo = path.resolve(__dirname, '..');
const argv = process.argv.slice(2);
const ri = argv.indexOf('--root');
const root = path.resolve(ri >= 0 ? argv.splice(ri, 2)[1] : path.join(repo, 'work'));
const [cmd, id, ...rest] = argv;

const STAGES = ['S1', 'S2', 'S3', 'S4', 'S5'];
const today = () => process.env.HARNESS_DATE || new Date().toISOString().slice(0, 10);
const dir = () => path.join(root, id);
const file = () => path.join(dir(), 'state.json');
const gateOf = stage => 'G' + stage.slice(1);
const die = m => { console.error(m); process.exit(2); };
const blank = () => ({ status: 'pending', attempts: 0, last_failures: [] });

function load() {
  try { return JSON.parse(fs.readFileSync(file(), 'utf8')); } catch (e) { return die('state.json 없음: init 먼저 실행'); }
}
function save(s) { fs.writeFileSync(file(), JSON.stringify(s, null, 2) + '\n'); }
function out(o) { console.log(JSON.stringify(o, null, 2)); }

if (!cmd || !id) die('사용법: node tools/state.js <init|next|record|approve|reject|retry|block|unblock> <screen-id> ...');

if (cmd === 'init') {
  if (fs.existsSync(file())) die('이미 있음: ' + file());
  fs.mkdirSync(path.join(dir(), '00-input', 'refs'), { recursive: true });
  fs.mkdirSync(path.join(dir(), '04-design'), { recursive: true });
  const s = {
    screen_id: id, current_stage: 'S1', blocked: null,
    gates: Object.fromEntries(['G1', 'G2', 'G3', 'G4', 'G5'].map(g => [g, blank()])),
    human_approval: { status: 'pending', date: null, reason: '' }
  };
  save(s); out(s);
} else if (cmd === 'next') {
  const s = load();
  if (s.blocked) out({ action: 'stop', reason: s.blocked });
  else if (s.current_stage === 'done') out({ action: 'done' });
  else {
    const g = gateOf(s.current_stage), gs = s.gates[g];
    if (gs.attempts >= 2) out({ action: 'stop', reason: `${g} 2번 연속 실패`, last_failures: gs.last_failures });
    else if (s.current_stage === 'S3' && gs.status === 'waiting_human') out({ action: 'wait_human', reason: 'G3 내부 관계자 확정 대기' });
    else out({ action: 'run', stage: s.current_stage, gate: g, retry: gs.attempts });
  }
} else if (cmd === 'record') {
  const gate = rest[0];
  if (!gate) die('gate 필요');
  let j; try { j = JSON.parse(fs.readFileSync(0, 'utf8')); } catch (e) { die('stdin JSON 오류'); }
  const s = load();
  if (gate === 'INPUT') {
    s.blocked = j.pass ? null : { type: 'input', failures: j.failures };
  } else {
    if (!s.gates[gate]) die('알 수 없는 gate: ' + gate);
    const gs = s.gates[gate];
    if (j.pass) {
      s.gates[gate] = { status: 'passed', attempts: 0, last_failures: [] };
      const n = STAGES.indexOf('S' + gate.slice(1)) + 1;
      s.current_stage = n < STAGES.length ? STAGES[n] : 'done';
    } else if (j.waiting_human) {
      gs.status = 'waiting_human'; gs.last_failures = j.failures;
    } else {
      gs.status = 'failed'; gs.attempts += 1; gs.last_failures = j.failures;
      if (gate === 'G5') { s.current_stage = 'S4'; s.gates.G4 = blank(); } // 위반 판정은 S4로 복귀
    }
  }
  save(s); out(s);
} else if (cmd === 'approve') {
  const s = load();
  s.human_approval = { status: 'approved', date: today(), reason: '' };
  save(s); out(s);
} else if (cmd === 'reject') {
  const s = load();
  s.human_approval = { status: 'rejected', date: today(), reason: rest.join(' ') };
  s.current_stage = 'S3';
  for (const g of ['G3', 'G4', 'G5']) s.gates[g] = blank();
  save(s); out(s);
} else if (cmd === 'retry') {
  const s = load();
  if (s.current_stage !== 'done') s.gates[gateOf(s.current_stage)].attempts = 0;
  save(s); out(s);
} else if (cmd === 'block') {
  const s = load(); s.blocked = { type: 'manual', reason: rest.join(' ') }; save(s); out(s);
} else if (cmd === 'unblock') {
  const s = load(); s.blocked = null; save(s); out(s);
} else die('알 수 없는 명령: ' + cmd);
