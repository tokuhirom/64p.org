// PDF（印刷）用に、各デモを実行した状態の静止画 demo-<ex>.png を撮る。
// 印刷では iframe の中身が出ないので、代わりにこの画像を出す（index.html の .print-only）。
// 使い方: sh fetch-mutsu-wasm.sh を済ませてから node gen-demo-shots.js
const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const ROOT = path.resolve(__dirname, '..');
const TALK = path.basename(__dirname);
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.wasm': 'application/wasm', '.css': 'text/css' };
const EXAMPLES = ['hello', 'grammar', 'multi', 'concurrency'];

(async () => {
  const srv = http.createServer((req, res) => {
    const f = path.join(ROOT, decodeURIComponent(new URL(req.url, 'http://x').pathname));
    if (!f.startsWith(ROOT) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end(); }
    res.writeHead(200, { 'content-type': TYPES[path.extname(f)] || 'application/octet-stream' });
    fs.createReadStream(f).pipe(res);
  });
  await new Promise(r => srv.listen(0, '127.0.0.1', r));
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  for (const ex of EXAMPLES) {
    await page.goto(`http://127.0.0.1:${srv.address().port}/${TALK}/demo.html?ex=${ex}`);
    await page.waitForFunction(() => !document.getElementById('run').disabled, null, { timeout: 120000 });
    if (!/local\)/.test(await page.textContent('#status'))) throw new Error('ローカルの wasm で動いていない: ' + ex);
    await page.click('#run');
    await page.waitForFunction(() => /done/.test(document.getElementById('status').textContent), null, { timeout: 60000 });
    const out = path.join(__dirname, `demo-${ex}.png`);
    await page.screenshot({ path: out });
    console.log(out, JSON.stringify((await page.textContent('#out')).slice(0, 60)));
  }
  await browser.close();
  srv.close();
})();
