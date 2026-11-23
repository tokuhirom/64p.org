// 全スライドが 16:9 の PC とスマホで画面内に収まり、文字が小さすぎないことを確認する。
// 使い方: node check-layout.js        (失敗があれば一覧を出して終了コード 1)
//   スクリーンショットも見たいとき: SHOTS=dir node check-layout.js
//   一部のスライドだけ: SLIDES=0,56,133 node check-layout.js
// Playwright と Chromium が必要。外部への通信は全部遮断した状態で開く（オフライン確認を兼ねる）。
const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium, devices } = require('playwright');

const ROOT = path.resolve(__dirname, '..');           // talks/
const TALK = path.basename(__dirname);
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml',
                '.txt': 'text/plain; charset=utf-8', '.wasm': 'application/wasm', '.png': 'image/png' };

const VIEWPORTS = [
  { name: 'PC 1920x1080', options: { viewport: { width: 1920, height: 1080 } } },
  { name: 'PC 1280x720',  options: { viewport: { width: 1280, height: 720 } } },
  { name: 'iPhone 13',    options: devices['iPhone 13'] },
  { name: 'Pixel 7',      options: devices['Pixel 7'] },
];

function serve() {
  return new Promise(resolve => {
    const srv = http.createServer((req, res) => {
      const u = decodeURIComponent(new URL(req.url, 'http://x').pathname);
      const f = path.join(ROOT, u);
      if (!f.startsWith(ROOT) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end(); }
      res.writeHead(200, { 'content-type': TYPES[path.extname(f)] || 'application/octet-stream' });
      fs.createReadStream(f).pipe(res);
    });
    srv.listen(0, '127.0.0.1', () => resolve(srv));
  });
}

(async () => {
  const srv = await serve();
  const base = `http://127.0.0.1:${srv.address().port}/${TALK}/index.html`;
  const browser = await chromium.launch();
  const failures = [];
  const shots = process.env.SHOTS;
  if (shots) fs.mkdirSync(shots, { recursive: true });

  for (const vp of VIEWPORTS) {
    const ctx = await browser.newContext(vp.options);
    await ctx.route('**/*', r => /^http:\/\/127\.0\.0\.1:/.test(r.request().url()) ? r.continue() : r.abort());
    const page = await ctx.newPage();
    await page.goto(base + '#0');
    await page.waitForFunction(() => /^\d+$/.test(document.getElementById('total_page').textContent));
    const total = Number(await page.textContent('#total_page'));
    const only = process.env.SLIDES ? process.env.SLIDES.split(',').map(Number) : null;
    for (let i = 0; i < total; i++) {
      if (only && !only.includes(i)) continue;
      await page.evaluate(n => { location.hash = '#' + n; }, i);
      await page.waitForFunction(n => document.getElementById('current_page').textContent === String(n + 1)
        && document.getElementById('topics').dataset.fitOk !== undefined, i);
      await page.evaluate(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))));
      const res = await page.evaluate(() => {
        window.presenFit && window.presenFit();
        const t = document.getElementById('topics');
        const W = window.innerWidth, H = window.innerHeight;
        const nav = document.getElementById('presen_nav');
        const navH = nav && getComputedStyle(nav).display !== 'none' ? nav.getBoundingClientRect().height : 0;
        const en = t.querySelector('.en');
        const enRect = en ? en.getBoundingClientRect() : null;
        const bottomLimit = (enRect ? enRect.top : H - navH) + 1;
        const problems = [];
        if (t.dataset.fitOk !== '1') problems.push(`下限 ${t.dataset.fitMin}px まで縮めても収まらない`);
        for (const el of t.querySelectorAll('*')) {
          if (el.closest('.en')) continue;
          const r = el.getBoundingClientRect();
          if (r.width === 0 || r.height === 0) continue;
          if (r.left < -1 || r.right > W + 1) { problems.push(`横にはみ出し: ${el.tagName} "${el.textContent.trim().slice(0, 30)}"`); break; }
          if (r.bottom > bottomLimit) { problems.push(`下にはみ出し: ${el.tagName} "${el.textContent.trim().slice(0, 30)}"`); break; }
        }
        if (enRect) {
          if (enRect.bottom > H - navH + 1 || enRect.top < 0) problems.push('英語字幕が画面外');
          if (enRect.height > H * 0.35) problems.push(`英語字幕が高すぎる (${Math.round(enRect.height)}px)`);
        }
        return { problems, size: t.dataset.fitSize, first: (t.innerText.split('\n')[0] || '').slice(0, 40) };
      });
      if (shots) await page.screenshot({ path: path.join(shots, `${vp.name.replace(/\W+/g, '_')}-${String(i).padStart(3, '0')}.png`) });
      if (res.problems.length) failures.push(`[${vp.name}] #${i} (${res.size}px) ${res.first}\n    ${res.problems.join('\n    ')}`);
    }
    console.log(`${vp.name}: ${total} slides checked`);
    await ctx.close();
  }
  await browser.close();
  srv.close();
  if (failures.length) {
    console.log(`\nNG: ${failures.length}\n` + failures.join('\n'));
    process.exit(1);
  }
  console.log('OK: all slides fit');
})();
