#!/usr/bin/env node
'use strict';
// 판정 스크립트 (읽기 전용): node judge/judge.js <screen-id> <gate> [--root <dir>] [--rules <file>]
// gate: INPUT | G1 | G2 | G3 | G4 | G5
// 통과 종료 코드 0, 실패 1, 사용법 오류 2. 결과는 stdout에 JSON으로 출력한다. 어떤 파일도 쓰지 않는다.
// 허용값·키워드·패턴은 모두 rules.json에서 읽는다. 이 파일에는 "어떻게 세는지"만 있다.

const fs = require('fs');
const path = require('path');

const repo = path.resolve(__dirname, '..');
const argv = process.argv.slice(2);
function opt(name, def) {
  const i = argv.indexOf(name);
  if (i < 0) return def;
  const v = argv[i + 1];
  argv.splice(i, 2);
  return v;
}
const root = path.resolve(opt('--root', path.join(repo, 'work')));
const rulesPath = path.resolve(opt('--rules', path.join(repo, 'rules.json')));
const [screen, gate] = argv;

let cfg;
try { cfg = JSON.parse(fs.readFileSync(rulesPath, 'utf8')); } catch (e) {
  console.error('rules.json을 읽을 수 없습니다: ' + e.message); process.exit(2);
}
if (!screen || !gate || !(gate in cfg.gates)) {
  console.error('사용법: node judge/judge.js <screen-id> <INPUT|G1|G2|G3|G4|G5> [--root dir] [--rules file]');
  process.exit(2);
}

const dir = path.join(root, screen);
const R = Object.fromEntries(cfg.rules.map(r => [r.id, r]));
const F = {
  screen: '00-input/screen.txt', refs: '00-input/refs', analysis: '01-analysis.md', spec: '02-screen-spec.md',
  keys: '03-keyscreens.md', tokens: '04-design/tokens.json', comps: '04-design/components.md',
  design: '04-design/screen-design.md', state: 'state.json'
};

const read = rel => { try { return fs.readFileSync(path.join(dir, rel), 'utf8'); } catch (e) { return null; } };
const listRefs = () => { try { return fs.readdirSync(path.join(dir, F.refs)).filter(n => !n.startsWith('.')); } catch (e) { return []; } };
const re = (src, flags) => new RegExp(src, flags);
const lines = t => t.split(/\r?\n/);
function sections(t) {
  const out = []; let cur = null;
  for (const l of lines(t)) {
    const m = l.match(/^##\s+(.*)$/);
    if (m) { cur = { title: m[1].trim(), body: [] }; out.push(cur); }
    else if (cur) cur.body.push(l);
  }
  return out;
}
const items = sec => sec.body.filter(l => /^\s*-\s+/.test(l));
const existing = rels => rels.map(r => [r, read(r)]).filter(([, t]) => t !== null);

// 각 검사는 실패 상세 문자열 배열을 돌려준다 (빈 배열이면 통과)
const checks = {
  INPUT() {
    const f = [];
    if (read(F.screen) === null) f.push(F.screen + ' 없음');
    if (listRefs().length < R.INPUT.allowed.min_refs) f.push('refs/에 레퍼런스 파일 없음');
    return f;
  },

  'G1-1'() {
    const t = read(F.analysis); if (t === null) return [F.analysis + ' 없음'];
    const refs = listRefs();
    if (!refs.length) return ['refs/에 레퍼런스 파일 없음'];
    return refs.filter(n => !t.includes(n)).map(n => `레퍼런스 미언급: ${n}`);
  },
  'G1-2'() {
    const t = read(F.analysis); if (t === null) return [F.analysis + ' 없음'];
    const a = R['G1-2'].allowed;
    const sec = sections(t).find(s => s.title === a.section);
    if (!sec) return [`'## ${a.section}' 섹션 없음`];
    const its = items(sec), refs = listRefs(), f = [];
    if (its.length < a.min_items) f.push(`반영 항목 ${its.length}개 (최소 ${a.min_items})`);
    its.forEach((l, i) => {
      if (refs.filter(n => l.includes(n)).length < a.min_refs_per_item) f.push(`항목 ${i + 1}: 레퍼런스 파일명 없음`);
      if ((l.match(re(a.prd_pattern, 'g')) || []).length < a.min_prd_refs_per_item) f.push(`항목 ${i + 1}: PRD 절(§) 없음`);
    });
    return f;
  },
  'G1-3'() {
    const t = read(F.analysis); if (t === null) return [F.analysis + ' 없음'];
    const a = R['G1-3'].allowed;
    const sec = sections(t).find(s => s.title === R['G1-2'].allowed.section);
    if (!sec) return [];
    const body = sec.body.join('\n');
    return a.keywords.filter(k => body.includes(k)).map(k => `MVP 제외 키워드: ${k}`);
  },

  'G2-1'() {
    const t = read(F.spec); if (t === null) return [F.spec + ' 없음'];
    const titles = sections(t).map(s => s.title);
    return R['G2-1'].allowed.sections.filter(s => !titles.includes(s)).map(s => `필수 섹션 없음: ${s}`);
  },
  'G2-2'() {
    const t = read(F.spec); if (t === null) return [F.spec + ' 없음'];
    const a = R['G2-2'].allowed;
    const sec = sections(t).find(s => s.title === a.section);
    if (!sec) return [];
    const f = [];
    for (const l of items(sec)) {
      const body = l.replace(/^\s*-\s+/, '').replace(/`/g, '').trim();
      if (body === '없음') continue;
      const m = body.match(/^([A-Za-z]+)\.([a-z_]+)/);
      if (!m) { f.push(`형식 오류(엔터티.필드): ${body}`); continue; }
      if (!a.fields[m[1]]) f.push(`PRD §8 밖 엔터티: ${m[1]}`);
      else if (!a.fields[m[1]].includes(m[2])) f.push(`PRD §8 밖 필드: ${m[1]}.${m[2]}`);
    }
    return f;
  },

  'G3-1'() {
    const t = read(F.keys); if (t === null) return [F.keys + ' 없음'];
    const a = R['G3-1'].allowed;
    const n = sections(t).filter(s => s.title.startsWith(a.heading_prefix)).length;
    return n < a.min || n > a.max ? [`키스크린 ${n}개 (허용 ${a.min}~${a.max})`] : [];
  },
  'G3-4'() {
    let st = null;
    try { st = JSON.parse(read(F.state)); } catch (e) { /* 없음 */ }
    const s = st && st.human_approval && st.human_approval.status;
    return s === R['G3-4'].allowed.status ? [] : [`사람 승인 상태: ${s || '없음'}`];
  },

  'D-01'() {
    const a = R['D-01'].allowed, f = [];
    for (const [rel, t] of existing([F.keys, F.comps, F.design])) {
      for (const m of t.matchAll(re(a.pattern, 'gi'))) {
        if (!a.px.includes(Number(m[1]))) f.push(`${rel}: 허용 밖 반경 ${m[1]}px`);
      }
    }
    const tk = read(F.tokens);
    if (tk !== null) {
      try {
        const o = JSON.parse(tk);
        for (const [k, v] of Object.entries(o.radius || {})) if (!a.px.includes(Number(v))) f.push(`${F.tokens}: 허용 밖 radius.${k}=${v}`);
      } catch (e) { /* JSON 오류는 G4-1이 잡는다 */ }
    }
    return f;
  },
  'D-02'() {
    const a = R['D-02'].allowed, f = [];
    const rx = re(R['D-01'].allowed.pattern, 'gi');
    for (const [rel, t] of existing([F.comps, F.design])) {
      lines(t).forEach((l, i) => {
        if (!a.line_keywords.some(k => l.toLowerCase().includes(k))) return;
        for (const m of l.matchAll(rx)) if (Number(m[1]) !== a.px) f.push(`${rel}:${i + 1} 버튼·배지·토글 반경 ${m[1]}px`);
        for (const tk of a.forbidden_tokens) if (l.includes(tk)) f.push(`${rel}:${i + 1} 버튼·배지·토글에 ${tk}`);
      });
    }
    return f;
  },
  'D-03'() {
    const a = R['D-03'].allowed, f = [];
    const hasAccent = l => a.accent_patterns.some(p => l.toLowerCase().includes(p.toLowerCase()));
    const dsg = read(F.design);
    if (dsg !== null) {
      const n = lines(dsg).reduce((s, l) => s + a.accent_patterns.reduce((c, p) => c + l.toLowerCase().split(p.toLowerCase()).length - 1, 0), 0);
      if (n > a.max_per_screen) f.push(`accent ${n}곳 (최대 ${a.max_per_screen})`);
    }
    for (const [rel, t] of existing([F.keys, F.comps, F.design])) {
      lines(t).forEach((l, i) => {
        if (a.cta_keywords.some(k => l.toLowerCase().includes(k.toLowerCase())) && hasAccent(l)) f.push(`${rel}:${i + 1} CTA/버튼에 accent`);
      });
    }
    return f;
  },
  'D-04'() {
    const a = R['D-04'].allowed, f = [];
    const rx = re(a.pattern);
    const keys = read(F.keys);
    if (keys !== null) {
      sections(keys).filter(s => s.title.startsWith(R['G3-1'].allowed.heading_prefix)).forEach(s => {
        const m = s.body.join('\n').match(rx);
        if (!m) f.push(`'${s.title}': 프레임 표기 없음`);
        else if (Number(m[1]) !== a.w || Number(m[2]) !== a.h) f.push(`'${s.title}': 프레임 ${m[1]}×${m[2]}`);
      });
    }
    const dsg = read(F.design);
    if (dsg !== null) {
      for (const m of dsg.matchAll(re(a.pattern, 'g'))) if (Number(m[1]) !== a.w || Number(m[2]) !== a.h) f.push(`${F.design}: 프레임 ${m[1]}×${m[2]}`);
    }
    return f;
  },
  'D-05'() {
    const a = R['D-05'].allowed, f = [];
    for (const [rel, t] of existing([F.keys, F.comps, F.design])) {
      lines(t).forEach((l, i) => {
        for (const m of l.matchAll(/box-shadow\s*:\s*([^;\n]+)/gi)) {
          // 'none'으로 시작하면 허용 ('box-shadow: none. 설명 문장'처럼 뒤에 글이 이어져도 값은 none)
          if (!/^none(?![\w-])/i.test(m[1].trim()) && !l.includes(a.exception_component)) f.push(`${rel}:${i + 1} box-shadow: ${m[1].trim()}`);
        }
      });
    }
    return f;
  },

  'G4-1'() {
    const t = read(F.tokens); if (t === null) return [F.tokens + ' 없음'];
    let o; try { o = JSON.parse(t); } catch (e) { return [F.tokens + ' JSON 오류: ' + e.message]; }
    const a = R['G4-1'].allowed, f = [];
    for (const [k, v] of Object.entries(o.radius || {})) if (!a.radius_px.includes(Number(v))) f.push(`radius.${k}=${v}`);
    const okHex = Object.values(a.colors).map(x => x.toLowerCase());
    for (const [k, v] of Object.entries(o.colors || {})) {
      if (typeof v !== 'string' || !okHex.includes(v.toLowerCase())) f.push(`colors.${k}=${v} (허용 hex 목록 밖)`);
    }
    return f;
  },
  'G4-2'() {
    const t = read(F.comps); if (t === null) return [F.comps + ' 없음'];
    const names = t.split(/\r?\n/).map(l => l.match(/^\s*-\s*`?([A-Za-z][A-Za-z0-9-]*)`?/)).filter(Boolean).map(m => m[1]);
    if (!names.length) return ['컴포넌트 항목 없음'];
    return names.filter(n => !R['G4-2'].allowed.names.includes(n)).map(n => `design.md에 없는 컴포넌트: ${n}`);
  },
  'G4-3'() {
    const t = read(F.design); if (t === null) return [F.design + ' 없음'];
    return (t.match(re(R['G4-3'].allowed.pattern, 'g')) || []).map(h => `hex 직접 사용: ${h}`);
  },

  'G5-1'() {
    return [F.analysis, F.spec, F.keys, F.tokens, F.comps, F.design].filter(r => read(r) === null).map(r => `${r} 없음`);
  },

  'S-B-1'() {
    const t = read(F.spec); if (t === null) return [F.spec + ' 없음'];
    const a = R['S-B-1'].allowed;
    return !re(a.applies_if).test(t) || re(a.pattern).test(t) ? [] : ["'공개 범위 기본값: 비공개' 줄 없음"];
  },
  'S-B-2'() {
    const t = read(F.spec); if (t === null) return [F.spec + ' 없음'];
    const a = R['S-B-2'].allowed;
    return !re(a.applies_if).test(t) || re(a.pattern).test(t) ? [] : ["'판매 신청 노출 조건: seller' 줄 없음"];
  },
  'S-B-3'() {
    const a = R['S-B-3'].allowed, f = [];
    for (const [rel, t] of existing([F.spec, F.keys, F.comps, F.design])) {
      for (const k of a.keywords) { const n = t.split(k).length - 1; if (n > a.max) f.push(`${rel}: '${k}' ${n}회`); }
    }
    return f;
  },
  'S-A-1'() {
    const t = read(F.spec); if (t === null) return [F.spec + ' 없음'];
    const a = R['S-A-1'].allowed;
    if (!re(a.applies_if).test(t)) return [];
    const ls = lines(t).filter(l => re(a.line_pattern).test(l)).join('\n');
    return a.keywords.filter(k => !ls.includes(k)).map(k => `확인 항목 없음: ${k}`);
  },
  'S-A-2'() {
    const a = R['S-A-2'].allowed, f = [];
    for (const [rel, t] of existing([F.spec, F.keys, F.tokens, F.comps, F.design])) {
      for (const p of a.patterns) for (const m of t.matchAll(re(p, 'g'))) f.push(`${rel}: 개인정보 패턴 ${m[0]}`);
    }
    return f;
  }
};

const ids = cfg.gates[gate] === 'ALL' ? cfg.rules.map(r => r.id).filter(id => id !== 'INPUT') : cfg.gates[gate];
const failures = [];
for (const id of ids) {
  if (!checks[id]) { failures.push({ rule: id, detail: '검사 구현 없음' }); continue; }
  for (const detail of checks[id]()) failures.push({ rule: id, detail });
}
const pass = failures.length === 0;
// G3에서 기계 조건은 모두 통과했고 사람 승인만 없으면(대기 또는 반려 후 재작업) 실패 횟수에 세지 않는다
const waiting_human = !pass && gate === 'G3' && failures.every(x => x.rule === 'G3-4');
console.log(JSON.stringify({ screen, gate, pass, waiting_human, checked: ids, failures }, null, 2));
process.exit(pass ? 0 : 1);
